import {Tile} from '../constants/Tile.constant';
import {DuplicateEndError} from '../errors/DuplicateEnd.error';
import {DuplicateStartError} from '../errors/DuplicateStart.error';
import {MissingEndError} from '../errors/MissingEnd.error';
import {MissingStartError} from '../errors/MissingStart.error';
import {IProblem} from '../interfaces/IProblem.interface';
import {Node} from './Node';

function _get(object: any, path: any[], defaultValue: any): any {
    let prop: any = object;

    if (!prop) {
        return defaultValue;
    }

    for (let x: number = 0; x < path.length; x++) {
        prop = prop[path[x]];

        if (!prop) {
            return defaultValue;
        }
    }

    return prop;
}

export class Problem implements IProblem {
    public nodes: Node[];

    constructor(problem: Tile[][]) {
        this.nodes = Problem.extractNodes(problem);
    }

    private static extractNodes(problem: Tile[][]): Node[] {
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
                     * 3   5
                     * 6 7 8
                     */
                    let neighbours: Tile[] = [
                        _get(problem, [y - 1, x - 1], null),
                        _get(problem, [y - 1, x], null),
                        _get(problem, [y - 1, x + 1], null),
                        problem[y][x - 1],
                        null,
                        problem[y][x + 1],
                        _get(problem, [y + 1, x - 1], null),
                        _get(problem, [y + 1, x], null),
                        _get(problem, [y + 1, x + 1], null),
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
}
