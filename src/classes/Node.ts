import {INode} from '../interfaces/INode.interface';
import {IPosition} from '../interfaces/IPosition.interface';

export class Node implements INode {
    public position: IPosition;
    public childNodes: INode[];

    constructor(position: IPosition) {
        this.position = position;
        this.childNodes = [];
    }

    public addChildNode(childNode: INode): void {
        this.childNodes.push(childNode);
    }
}
