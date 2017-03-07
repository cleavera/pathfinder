import {Tile} from '../constants/Tile.constant';
import {DuplicateEndError} from '../errors/DuplicateEnd.error';
import {DuplicateStartError} from '../errors/DuplicateStart.error';
import {MissingEndError} from '../errors/MissingEnd.error';
import {MissingStartError} from '../errors/MissingStart.error';
import {$get} from '../helpers/GetProp.helper';
import {INode} from '../interfaces/INode.interface';
import {IPosition} from '../interfaces/IPosition.interface';

export class Node implements INode {
    public position: IPosition;
    public childNodes: INode[];

    constructor(position: IPosition) {
        this.position = position;
        this.childNodes = [];
    }

    public static extractNodes(problem: Tile[][]): Node[] {
        let start: Node,
            end: Node,
            nodes: Node[] = [];

        problem.forEach((row: Tile[], y: number) => {
            row.forEach((tile: Tile, x: number) => {
                if (tile === Tile.START) {
                    if (start) {
                        throw new DuplicateStartError();
                    }

                    start = new Node({ x, y });
                } else if (tile === Tile.END) {
                    if (end) {
                        throw new DuplicateEndError();
                    }

                    end = new Node({ x, y });
                } else if (tile === Tile.EMPTY) {
                    /*
                     * 0 1 2
                     * 3 X 5
                     * 6 7 8
                     */
                    let neighbours: Tile[] = [
                        $get(problem, [y - 1, x - 1], null),
                        $get(problem, [y - 1, x], null),
                        $get(problem, [y - 1, x + 1], null),
                        problem[y][x - 1],
                        null,
                        problem[y][x + 1],
                        $get(problem, [y + 1, x - 1], null),
                        $get(problem, [y + 1, x], null),
                        $get(problem, [y + 1, x + 1], null),
                    ];

                    if (neighbours[3] === Tile.EMPTY) {
                        if (neighbours[1] === Tile.EMPTY && neighbours[0] === Tile.OBSTACLE) {
                            nodes.push(new Node({x, y}));

                            return;
                        }

                        if (neighbours[7] === Tile.EMPTY && neighbours[6] === Tile.OBSTACLE) {
                            nodes.push(new Node({x, y}));

                            return;
                        }
                    }

                    if (neighbours[5] === Tile.EMPTY) {
                        if (neighbours[1] === Tile.EMPTY && neighbours[2] === Tile.OBSTACLE) {
                            nodes.push(new Node({x, y}));

                            return;
                        }

                        if (neighbours[7] === Tile.EMPTY && neighbours[8] === Tile.OBSTACLE) {
                            nodes.push(new Node({x, y}));

                            return;
                        }
                    }
                }
            });
        });

        if (!start) {
            throw new MissingStartError();
        }

        if (!end) {
            throw new MissingEndError();
        }

        nodes.unshift(start);
        nodes.push(end);

        return nodes;
    }

    public addChildNode(childNode: INode): void {
        this.childNodes.push(childNode);
    }
}
