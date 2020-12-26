import { IStore } from '../interfaces/IStore';
import { IAction } from '../interfaces/IAction';
import { EAction } from '../interfaces/EAction';
import { IBody } from '../interfaces/IBody';
import { heavyGun, melee, pistols, throwingWeapon } from './itemTypes';

export const reducer = (state: IStore, action: IAction) => {
    switch (action.type) {
        case EAction.ADD_UP_ENV: {
            const { data } = action;
            const newStore = { ...state.environment };
            newStore.up.data.push(data);
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.REMOVE_UP_ENV: {
            const { data } = action;
            const newStore = { ...state.environment };
            const newArray = newStore.up.data.filter((item) => {
                return item.id !== Number(data);
            });
            newStore.up.data = [...newArray];
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.ADD_DOWN_ENV: {
            const { data } = action;
            const newStore = { ...state.environment };
            newStore.down.data.push(data);
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.REMOVE_DOWN_ENV: {
            const { data } = action;
            const newStore = { ...state.environment };
            const newArray = newStore.down.data.filter((item) => {
                return item.id !== Number(data);
            });
            newStore.down.data = [...newArray];
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.ADD_BODY_ITEM: {
            const { data } = action;
            const newState = { ...state.body };
            if (data.item === 29) {
                newState['BagsAndParachutes'] = { ...data, description: 'bag' };
                state = { ...state, body: { ...newState } };
                return state;
            }

            if (data.description) {
                if (data.img) {
                    newState[String(data.description) as keyof IBody] = { ...data, description: data.img };
                    state = { ...state, body: { ...newState } };
                    return state;
                }
                newState[String(data.description) as keyof IBody] = { ...data };
                state = { ...state, body: { ...newState } };
                return state;
            }
            return state;
        }
        case EAction.ADD_BODY_COSTUME: {
            const { data } = action;
            const newState = { ...state.body };
            if (data.description) {
                newState['BodyArmors'] = { ...data };
                state = { ...state, body: { ...newState } };
                return state;
            }
            return state;
        }
        case EAction.REMOVE_BODY_ITEM: {
            const { data } = action;
            const newState = { ...state.body };
            for (let item in newState) {
                if (newState[item as keyof IBody].id === Number(data)) {
                    newState[item as keyof IBody] = {
                        description: item
                    }
                    break;
                }
            }
            state = { ...state, body: { ...newState } };
            return state;
        }
        case EAction.ADD_BODY_WEAPON: {
            const { data } = action;
            const newState = { ...state.body };
            if (data.description) {
                const isPistol = pistols.find(item => item === data.description);
                if (isPistol) {
                    newState.pistols = { ...data };
                    state = { ...state, body: { ...newState } };
                    return state;
                }
                const isHeavyGun = heavyGun.find(item => item === data.description);
                if (isHeavyGun) {
                    newState.gun = { ...data };
                    state = { ...state, body: { ...newState } };
                    return state;
                }
                const isMelee = melee.find(item => item === data.description);
                if (isMelee) {
                    newState.knife = { ...data };
                    state = { ...state, body: { ...newState } };
                    return state;
                }
                const isThrowing = throwingWeapon.find(item => item === data.description);
                if (isThrowing) {
                    newState.grenade = { ...data };
                    state = { ...state, body: { ...newState } };
                    return state;
                }
            }
            return state;
        }
        case EAction.REMOVE_BODY_WEAPON: {
            const { data } = action;
            const newState = { ...state.body };
            if (newState.pistols.id === Number(data)) {
                newState.pistols = { description: 'pistols' };
                state = { ...state, body: { ...newState } };
                return state;
            }
            if (newState.gun.id === Number(data)) {
                newState.gun = { description: 'gun' };
                state = { ...state, body: { ...newState } };
                return state;
            }
            if (newState.knife.id === Number(data)) {
                newState.knife = { description: 'knife' };
                state = { ...state, body: { ...newState } };
                return state;
            }
            if (newState.grenade.id === Number(data)) {
                newState.grenade = { description: 'grenade' };
                state = { ...state, body: { ...newState } };
                return state;
            }
            return state;
        }
        case EAction.SET_INV_CURRENT_WEIGHT: {
            const { data } = action;
            const newState = { ...state.inventory };
            if (newState.inv.weight !== undefined) {
                newState.inv.weight = Number(data);
            }
            state = { ...state, inventory: { ...newState } };
            return state;
        }
        case EAction.SET_BAG_CURRENT_WEIGHT: {
            const { data } = action;
            const newState = { ...state.inventory };
            if (newState.bag.weight !== undefined) {
                newState.bag.weight = Number(data);
            }
            state = { ...state, inventory: { ...newState } };
            return state;
        }
        case EAction.ADD_BAG_ITEM: {
            const { data } = action;
            const newState = { ...state.inventory };
            newState.bag.data.push(data);
            if (newState.bag.weight !== undefined) {
                newState.bag.weight = newState.bag.weight + data.weight;
            }
            state = { ...state, inventory: { ...newState } };
            return state;
        }
        case EAction.ADD_INV_ITEM: {
            const { data } = action;
            const newState = { ...state.inventory };
            newState.inv.data.push(data);
            if (newState.inv.weight !== undefined) {
                newState.inv.weight = newState.inv.weight + data.weight;
            }
            state = { ...state, inventory: { ...newState } };
            return state;
        }
        case EAction.REMOVE_BAG_ITEM: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const idx = newStore.bag.data.findIndex((item) => {
                return item.id === Number(data);
            });
            if (idx !== -1) {
                if (newStore.bag.weight !== undefined) {
                    newStore.bag.weight = newStore.bag.weight - newStore.bag.data[idx].weight;
                }
                newStore.bag.data.splice(idx, 1);
                newStore.bag.data = [...newStore.bag.data];
                state = { ...state, inventory: { ...newStore } };
            }
            return state;
        }
        case EAction.REMOVE_INV_ITEM: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const idx = newStore.inv.data.findIndex((item) => {
                return item.id === Number(data);
            });
            if (idx !== -1) {
                if (newStore.inv.weight !== undefined) {
                    newStore.inv.weight = newStore.inv.weight - newStore.inv.data[idx].weight;
                }
                newStore.inv.data.splice(idx, 1);
                newStore.inv.data = [...newStore.inv.data];
                state = { ...state, inventory: { ...newStore } };
            }
            return state;
        }
        case EAction.CHANGE_INV_ITEM_STATE: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const findItem = newStore.inv.data.find((item) => {
                return item.id === data.id;
            });
            if (findItem) {
                findItem.state = data.state;
                findItem.weight = data.weight;
            }
            state = { ...state, inventory: { ...newStore } };
            return state;
        }
        case EAction.CHANGE_BAG_ITEM_STATE: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const findItem = newStore.bag.data.find((item) => {
                return item.id === data.id;
            });
            if (findItem) {
                findItem.state = data.state;
                findItem.weight = data.weight;
            }
            state = { ...state, inventory: { ...newStore } };
            return state;
        }
        case EAction.SET_UP_ENV_NAME: {
            const { data } = action;
            const newStore = { ...state };
            newStore.environment.up.title = (data as unknown) as string;
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.SET_DOWN_ENV_NAME: {
            const { data } = action;
            const newStore = { ...state };
            newStore.environment.down.title = (data as unknown) as string;
            state = { ...state, ...newStore };
            return state;
        }
        case EAction.REFRESH_DOWN_ENV_ITEM: {
            const { data } = action;
            const newStore = { ...state.environment };
            const newArray = [...newStore.down.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === data.id;
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], ...data, description: newArray[itemIDX].description }
            }
            newStore.down.data = [...newArray];
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.REFRESH_UP_ENV_ITEM: {
            const { data } = action;
            const newStore = { ...state.environment };
            const newArray = [...newStore.up.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === data.id;
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], ...data, description: newArray[itemIDX].description }
            }
            newStore.up.data = [...newArray];
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.REFRESH_BAG_ITEM: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const newArray = [...newStore.bag.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === data.id;
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], ...data, description: newArray[itemIDX].description }
            }
            newStore.bag = { ...newStore.bag, data: [...newArray] };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.REFRESH_INV_ITEM: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const newArray = [...newStore.inv.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === data.id;
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], ...data, description: newArray[itemIDX].description }
            }
            newStore.inv = { ...newStore.inv, data: [...newArray] };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.ADD_ITEM_DESCRIPTION_INV: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const newArray = [...newStore.inv.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === data.id;
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], userDescription: data.userDescription };
            }
            newStore.inv = { ...newStore.inv, data: [...newArray] };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.ADD_ITEM_DESCRIPTION_BAG: {
            const { data } = action;
            const newStore = { ...state.inventory };
            const newArray = [...newStore.bag.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === data.id;
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], userDescription: data.userDescription };
            }
            newStore.bag = { ...newStore.bag, data: [...newArray] };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.ADD_DISABLE_INV: {
            const { data } = action;
            const { id, disable } = data;
            const newStore = { ...state.inventory };
            const newArray = [...newStore.inv.data];
            const itemIDX = newArray.findIndex((item) => {
                return Number(item.id) === Number(id);
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = {
                    ...newArray[itemIDX],
                    disabled: disable
                };
            }
            newStore.inv = { ...newStore.inv, data: [...newArray] };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.ADD_DISABLE_BAG: {
            const { data } = action;
            const { id, disable } = data;
            const newStore = { ...state.inventory };
            const newArray = [...newStore.bag.data];
            const itemIDX = newArray.findIndex((item) => {
                return Number(item.id) === Number(id);
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = {
                    ...newArray[itemIDX],
                    disabled: disable
                };
            }
            newStore.bag = { ...newStore.bag, data: [...newArray] };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.DISABLE_INV: {
            const { data } = action;
            const newStore = { ...state.inventory };
            newStore.inv.disabled = data;
            newStore.inv = { ...newStore.inv };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.DISABLE_BAG: {
            const { data } = action;
            const newStore = { ...state.inventory };
            newStore.bag.disabled = data;
            newStore.bag = { ...newStore.bag };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.SET_INV_CELL_COUNT: {
            const { data } = action;
            const newStore = { ...state.inventory };
            newStore.inv.cellLimit = Number(data);
            newStore.inv = { ...newStore.inv };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.SET_BAG_CELL_COUNT: {
            const { data } = action;
            const newStore = { ...state.inventory };
            newStore.bag.cellLimit = Number(data);
            newStore.bag = { ...newStore.bag };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.SET_INV_WEIGHT_LIMIT: {
            const { data } = action;
            const newStore = { ...state.inventory };
            newStore.inv.weightLimit = Number(data);
            newStore.inv = { ...newStore.inv };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.SET_BAG_WEIGHT_LIMIT: {
            const { data } = action;
            const newStore = { ...state.inventory };
            newStore.bag.weightLimit = Number(data);
            newStore.bag = { ...newStore.bag };
            state = { ...state, inventory: { ...newStore } };
            return { ...state };
        }
        case EAction.ADD_DISABLE_BODY: {
            const { data } = action;
            const { id, disable } = data;
            const newState = { ...state.body };
            for (let item in newState) {
                if (newState[item as keyof IBody].id === Number(id)) {
                    newState[item as keyof IBody].disabled = disable;
                    break;
                }
            }
            state = { ...state, body: { ...newState } };
            return state;
        }
        case EAction.ADD_DISABLE_ENV_UP: {
            const { data } = action;
            const { id, disable } = data;
            const newStore = { ...state.environment };
            const newArray = [...newStore.up.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === Number(id);
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], disabled: disable };
            }
            newStore.up.data = [...newArray];
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        case EAction.ADD_DISABLE_ENV_DOWN: {
            const { data } = action;
            const { id, disable } = data;
            const newStore = { ...state.environment };
            const newArray = [...newStore.down.data];
            const itemIDX = newArray.findIndex((item) => {
                return item.id === Number(id);
            });
            if (itemIDX !== -1) {
                newArray[itemIDX] = { ...newArray[itemIDX], disabled: disable };
            }
            newStore.down.data = [...newArray];
            state = { ...state, environment: { ...newStore } };
            return state;
        }
        default:
            return state;
    }
};
