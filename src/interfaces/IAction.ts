import { EAction } from './EAction';
import { ICellData } from './ICellData';

export interface IAction {
    type: EAction;
    data: ICellData;
}

