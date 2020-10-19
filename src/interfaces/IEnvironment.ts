import { IEnvironmentPart } from './IEnvironmentPart';

export interface IEnvironment {
    up: IEnvironmentPart;
    down: IEnvironmentPart;
}