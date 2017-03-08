import { Tile } from '../constants/Tile.constant';
import { INode } from '../interfaces/INode.interface';
import { IPosition } from '../interfaces/IPosition.interface';
export declare class Node implements INode {
    position: IPosition;
    childNodes: INode[];
    constructor(position: IPosition);
    static extractNodes(problem: Tile[][]): Node[];
    static isConnected(node1: INode, node2: INode, problem: Tile[][]): boolean;
    addChildNode(childNode: INode): void;
    toString(): string;
}
