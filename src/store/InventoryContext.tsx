import React, { useContext, useReducer } from 'react';
import { initialState } from './initialState';
import { IStore } from '../interfaces/IStore';
import { reducer } from './reducer';
import { IAction } from '../interfaces/IAction';
import { ICellData } from '../interfaces/ICellData';
import { bags, clothesTypes, itemTypes } from './itemTypes';


export interface IUserDescription {
    userDescription?: string;
    id: number;
}

interface IExport {
    store: IStore;
    createAction?: (a: IAction | any) => void;
}


const InventoryContext = React.createContext<IExport>({ store: initialState });

export const useStore = () => {
    return useContext(InventoryContext)
}

interface IParsedString {
    sex: number;
    Slot: number;
    Drawable: number;
    Description: string;
}

export interface IDisableItem {
    id: string;
    disable: boolean;
}

type TPayload = ICellData | string | IUserDescription | boolean | IDisableItem;

const convertData = (data: TPayload) => {
    if (typeof data === 'boolean') {
        return data;
    }

    if (typeof data === 'string') {
        return data;
    }

    if ((data as IDisableItem).disable) {
        return  data;
    }

    if ((data as IUserDescription).userDescription) {
        return  data;
    }

    const { item, description } = data as ICellData;

    if (item === 17 && description) {
        const newDesc = JSON.parse(description);
        if ('description' in data) {
            data.description = newDesc.Hash;
        }
        return data;
    }

    if (item === 20 && description) {
        const parsedData: IParsedString = JSON.parse(description);
        const newDesc = clothesTypes[parsedData.Slot];
        if (parsedData.Slot === 5) {
            return { ...data, description: newDesc, img: bags[parsedData.Description] };
        }
        return { ...data, description: newDesc };
    }
    const newDesc = itemTypes[item];
    return { ...data, description: newDesc };
}

export const StoreProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const createAction = (arg: IAction) => {
        const newArg = {
            data: convertData(arg.data),
            type: arg.type
        }
        return dispatch(newArg);
    }

    const exportData: IExport = {
        store: state,
        createAction
    }

    return (
        <InventoryContext.Provider value={exportData}>
            {children}
        </InventoryContext.Provider>
    );
};
