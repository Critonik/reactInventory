import { IInventory } from './IInventory';
import { IBody } from './IBody';
import { IEnvironment } from './IEnvironment';

export interface IStore {
    environment: IEnvironment;
    body: IBody;
    inventory: IInventory;
}
