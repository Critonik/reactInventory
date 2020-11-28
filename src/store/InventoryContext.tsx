import React, { useContext, useReducer } from 'react';
import { initialState } from './initialState';
import { IStore } from '../interfaces/IStore';
import { reducer } from './reducer';
import { IAction } from '../interfaces/IAction';
import { ICellData } from '../interfaces/ICellData';
import { clothesTypes, itemTypes } from './itemTypes';


interface IExport {
    store: IStore;
    createAction?: (a: IAction | any) => void;
}


const InventoryContext = React.createContext<IExport>({store: initialState});

export const useStore = () => {
    return useContext(InventoryContext)
}

interface IParsedString {
    sex: number;
    Slot: number;
    Drawable: number;
    Description: string;
}

const convertData = (data: ICellData | string) => {
    if (typeof data === 'string') {
        return data;
    }
    const { item, description } = data;
    if (item === 20 && description) {
        const parsedData: IParsedString = JSON.parse(description);
        const newDesc = clothesTypes[parsedData.Slot];
        return {...data, description: newDesc};
    }
    const newDesc = itemTypes[item];
    return {...data, description: newDesc};
}

export const StoreProvider: React.FC = ({children}) => {
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
