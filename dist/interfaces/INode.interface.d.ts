import { IPosition } from './IPosition.interface';
export interface INode {
    position: IPosition;
    childNodes: INode[];
}
