import { IPosition } from './position.interface';

export interface INode {
    position: IPosition;
    childNodes: INode[];
}
