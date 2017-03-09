import { INode } from './INode.interface';
import { IPosition } from './IPosition.interface';
export interface IJourney {
    distance: number;
    length: number;
    path: IPosition[];
    addNode(node: INode): void;
    clone(): IJourney;
    hasVisited(node: INode): boolean;
}
