import { INode } from './node.interface';
import { IPosition } from './position.interface';

export interface IJourney {
    distance: number;
    length: number;
    path: IPosition[];

    addNode(node: INode): void;

    clone(): IJourney;

    hasVisited(node: INode): boolean;
}
