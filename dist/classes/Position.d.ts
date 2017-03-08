import { IPosition } from '../interfaces/IPosition.interface';
export declare class Position implements IPosition {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static distance(position1: IPosition, position2: IPosition): number;
}
