import { ICellData } from './ICellData';

export interface IEnvironmentPart {
    title: string;
    data: ICellData[];
    weight?: number;
}