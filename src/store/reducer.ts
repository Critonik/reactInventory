import { IStore } from '../interfaces/IStore';
import { IAction } from '../interfaces/IAction';
import { EAction } from '../interfaces/EAction';
import { IBody } from '../interfaces/IBody';

export const reducer = (state: IStore, action: IAction) => {
    switch (action.type) {
        case EAction.ADD_UP_ENV: {
            const { data } = action;
            const newStore = {...state.environment};
            newStore.up.data.push(data);
            state = { ...state, environment: {...newStore} };
            return state;
        }
        case EAction.REMOVE_UP_ENV: {
            const { data } = action;
            const newStore = {...state.environment};
            const newArray = newStore.up.data.filter(item => {
                return item.id !== data.id
            });
            newStore.up.data = [...newArray];
            state = { ...state, environment: {...newStore} };
            return state;
        }
        case EAction.ADD_DOWN_ENV: {
            const { data } = action;
            const newStore = {...state.environment};
            newStore.down.data.push(data);
            state = { ...state, environment: {...newStore} };
            return state;
        }
        case EAction.REMOVE_DOWN_ENV: {
            const { data } = action;
            const newStore = {...state.environment};
            const newArray = newStore.down.data.filter(item => {
                return item.id !== data.id
            });
            newStore.down.data = [...newArray];
            state = { ...state, environment: {...newStore} };
            return state;
        }
        case EAction.ADD_BODY_ITEM: {
            const { data } = action;
            const newState = { ...state.body };
            if (data.description) {
                newState[String(data.description) as keyof IBody] = {...data};
                state = {...state, body: { ...newState}};
                return state;
            }
            return state;
        }
        case EAction.REMOVE_BODY_ITEM: {
            const { data } = action;
            const newState = { ...state.body };
            if (data.description) {
                newState[data.description as keyof IBody] = {description: data.description}
                state = {...state, body: { ...newState}};
                return state;
            }
            return state;
        }
        case EAction.ADD_BAG_ITEM: {
            const { data } = action;
            const newState = { ...state.inventory };
            newState.bag.data.push(data);
            if (newState.bag.weight !== undefined) {
                newState.bag.weight = newState.bag.weight + data.weight;
            }
            state = { ...state, ...newState };
            return state;
        }
        case EAction.ADD_INV_ITEM: {
            const { data } = action;
            const newState = { ...state.inventory };
            newState.inv.data.push(data);
            if (newState.inv.weight !== undefined) {
                newState.inv.weight = newState.inv.weight + data.weight;
            }
            state = { ...state, ...newState };
            return state;
        }
        case EAction.REMOVE_BAG_ITEM: {
            const { data } = action;
            const newStore = {...state.inventory};
            const newArray = newStore.bag.data.filter(item => {
                return item.id !== data.id
            });
            newStore.bag.data = [...newArray];
            if (newStore.bag.weight !== undefined) {
                newStore.bag.weight = newStore.bag.weight - data.weight;
            }
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.REMOVE_INV_ITEM: {
            const { data } = action;
            const newStore = {...state.inventory};
            const newArray = newStore.inv.data.filter(item => {
                return item.id !== data.id
            });
            newStore.inv.data = [...newArray];
            if (newStore.inv.weight !== undefined) {
                newStore.inv.weight = newStore.inv.weight - data.weight;
            }
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.CHANGE_INV_ITEM_STATE: {
            const { data } = action;
            const newStore = {...state.inventory};
            const findItem = newStore.inv.data.find(item => {
                return item.id === data.id
            });
            if (findItem) {
                findItem.state = data.state;
                findItem.weight = data.weight;
            }
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.CHANGE_BAG_ITEM_STATE: {
            const { data } = action;
            const newStore = {...state.inventory};
            const findItem = newStore.bag.data.find(item => {
                return item.id === data.id
            });
            if (findItem) {
                findItem.state = data.state;
                findItem.weight = data.weight;
            }
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.SET_UP_ENV_NAME: {
            const { data } = action;
            const newStore = {...state};
            newStore.environment.up.title = data as unknown as string;
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.SET_DOWN_ENV_NAME: {
            const { data } = action;
            const newStore = {...state};
            newStore.environment.down.title = data as unknown as string;
            state = { ...state, ...newStore };
            return state;
        }
        default:
            return state
    }
}