import React, { useContext, useReducer } from 'react';
import { initialState } from './initialState';
import { IStore } from '../interfaces/IStore';
import { reducer } from './reducer';
import { IAction } from '../interfaces/IAction';


interface IExport {
    store: IStore;
    createAction?: (a: IAction) => void;
}


const InventoryContext = React.createContext<IExport>({store: initialState});

export const useStore = () => {
    return useContext(InventoryContext)
}

export const StoreProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const createAction = (arg: IAction) => {
        return dispatch(arg);
    }

    const exportData:IExport = {
        store: state,
        createAction
    }

    return (
        <InventoryContext.Provider value={exportData}>
            {children}
        </InventoryContext.Provider>
    );
};
