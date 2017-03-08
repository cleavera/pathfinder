import {INode} from './INode.interface';

export interface IJourney {
    distance: number;
    addNode(node: INode): void;
    clone(): IJourney;
    hasVisited(node: INode): boolean;
}
