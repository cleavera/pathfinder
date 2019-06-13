import { $isNull, Maybe } from '@cleavera/utils';
import { Tile } from '../constants/tile.constant';
import { DuplicateEndError } from '../errors/duplicate-end.error';
import { DuplicateStartError } from '../errors/duplicate-start.error';
import { MissingEndError } from '../errors/missing-end.error';
import { MissingStartError } from '../errors/missing-start.error';
import { $get } from '../helpers/get-prop.helper';
import { INode } from '../interfaces/node.interface';
import { IPosition } from '../interfaces/position.interface';
import { Position } from './position';

export class Node implements INode {
    public position: IPosition;
    public childNodes: Array<INode>;

    constructor(position: IPosition) {
        this.position = position;
        this.childNodes = [];
    }

    public static ExtractNodes(problem: Array<Array<Tile>>): Array<Node> {
        let start: Maybe<Node> = null,
            end: Maybe<Node> = null;

        const nodes: Array<Node> = [];

        problem.forEach((row: Array<Tile>, y: number) => {
            row.forEach((tile: Tile, x: number) => {
                if (tile === Tile.START) {
                    if (!$isNull(start)) {
                        throw new DuplicateStartError();
                    }

                    start = new Node(new Position(x, y));
                } else if (tile === Tile.END) {
                    if (!$isNull(end)) {
                        throw new DuplicateEndError();
                    }

                    end = new Node(new Position(x, y));
                } else if (tile === Tile.EMPTY) {
                    /*
                     * 0 1 2
                     * 3 X 5
                     * 6 7 8
                     */
                    const neighbours: Array<Maybe<Tile>> = [
                        $get<Maybe<Tile>>(problem, [y - 1, x - 1], null),
                        $get<Maybe<Tile>>(problem, [y - 1, x], null),
                        $get<Maybe<Tile>>(problem, [y - 1, x + 1], null),
                        problem[y][x - 1],
                        null,
                        problem[y][x + 1],
                        $get<Maybe<Tile>>(problem, [y + 1, x - 1], null),
                        $get<Maybe<Tile>>(problem, [y + 1, x], null),
                        $get<Maybe<Tile>>(problem, [y + 1, x + 1], null)
                    ];

                    if (neighbours[3] !== Tile.OBSTACLE) {
                        if (neighbours[1] !== Tile.OBSTACLE && neighbours[0] === Tile.OBSTACLE) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }

                        if (neighbours[7] !== Tile.OBSTACLE && neighbours[6] === Tile.OBSTACLE) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }
                    }

                    if (neighbours[5] !== Tile.OBSTACLE) {
                        if (neighbours[1] !== Tile.OBSTACLE && neighbours[2] === Tile.OBSTACLE) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }

                        if (neighbours[7] !== Tile.OBSTACLE && neighbours[8] === Tile.OBSTACLE) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }
                    }
                }
            });
        });

        if ($isNull(start)) {
            throw new MissingStartError();
        }

        if ($isNull(end)) {
            throw new MissingEndError();
        }

        nodes.unshift(start);
        nodes.push(end);

        return nodes;
    }

    public static isConnected(node1: INode, node2: INode, problem: Array<Array<Tile>>): boolean {
        const startPosition: IPosition = {
            x: node1.position.x > node2.position.x ? node2.position.x : node1.position.x,
            y: node1.position.y > node2.position.y ? node2.position.y : node1.position.y
        };

        const endPosition: IPosition = {
            x: node1.position.x > node2.position.x ? node1.position.x : node2.position.x,
            y: node1.position.y > node2.position.y ? node1.position.y : node2.position.y
        };

        let isConnected: boolean = true;

        for (let x: number = startPosition.x; x <= endPosition.x; x++) {
            for (let y: number = startPosition.y; y <= endPosition.y; y++) {
                const isNodeStartPosition: boolean = x === node1.position.x && y === node1.position.y,
                    isNodeEndPosition: boolean = x === node2.position.x && y === node2.position.y,
                    isObstacle: boolean = problem[y][x] === Tile.OBSTACLE,
                    isStart: boolean = problem[y][x] === Tile.START,
                    isEnd: boolean = problem[y][x] === Tile.END;

                if (!isNodeStartPosition && !isNodeEndPosition && (isObstacle || isStart || isEnd)) {
                    isConnected = false;

                    break;
                }
            }
        }

        return isConnected;
    }

    public addChildNode(childNode: INode): void {
        this.childNodes.push(childNode);
    }

    public toString(): string {
        return JSON.stringify(this.position);
    }
}
