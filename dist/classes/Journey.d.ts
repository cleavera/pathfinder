import { IJourney } from '../interfaces/IJourney.interface';
import { INode } from '../interfaces/INode.interface';
import { Position } from './Position';
export declare class Journey implements IJourney {
    distance: number;
    private _nodes;
    constructor(start: INode);
    readonly path: Position[];
    addNode(node: INode): void;
    clone(): Journey;
    hasVisited(node: INode): boolean;
    toString(): string;
}
