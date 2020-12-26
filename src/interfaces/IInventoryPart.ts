import { IEnvironmentPart } from './IEnvironmentPart';

export interface IInventoryPart extends IEnvironmentPart {
    cellLimit: number;
    weightLimit?: number;
    disabled?: boolean;
}
