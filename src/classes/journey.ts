import { $isNull, Maybe } from '@cleavera/utils';
import { MissingStartError } from '../errors/missing-start.error';
import { IJourney } from '../interfaces/journey.interface';
import { INode } from '../interfaces/node.interface';
import { Position } from './position';

export class Journey implements IJourney {
    public distance: number;
    private _nodes: Array<INode>;

    constructor(start: INode) {
        this._nodes = [start];
        this.distance = 0;
    }

    public get path(): Array<Position> {
        return this._nodes.map((node: INode) => {
            return node.position;
        });
    }

    public get length(): number {
        return this._nodes.length;
    }

    public addNode(node: INode): void {
        this.distance += Position.distance(node.position, this._nodes[this._nodes.length - 1].position);
        this._nodes.push(node);
    }

    public clone(): Journey {
        let journey: Maybe<Journey> = null;

        this._nodes.forEach((node: INode) => {
            if (!journey) {
                journey = new Journey(node);
            } else {
                journey.addNode(node);
            }
        });

        if ($isNull(journey)) {
            throw new MissingStartError();
        }

        return journey;
    }

    public hasVisited(node: INode): boolean {
        return this._nodes.indexOf(node) > -1;
    }

    public toString(): string {
        return this._nodes.join(', ');
    }
}
