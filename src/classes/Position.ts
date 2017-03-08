import {IPosition} from '../interfaces/IPosition.interface';

export class Position implements IPosition {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static distance(position1: IPosition, position2: IPosition): number {
        return Math.sqrt(Math.pow(position2.x - position1.x, 2) + Math.pow(position2.y - position1.y, 2));
    }
}
