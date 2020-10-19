import { IInventoryPart } from './IInventoryPart';

export interface IInventory {
    inv: IInventoryPart;
    bag: IInventoryPart;
}