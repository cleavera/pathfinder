import { $isNull, Maybe } from '@cleavera/utils';
import { Tile } from '../constants/tile.constant';
import { DuplicateEndError } from '../errors/duplicate-end.error';
import { DuplicateStartError } from '../errors/duplicate-start.error';
import { MissingEndError } from '../errors/missing-end.error';
import { MissingStartError } from '../errors/missing-start.error';
import { INode } from '../interfaces/node.interface';
import { IPosition } from '../interfaces/position.interface';
import { TileService } from '../services/tile.service';
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
                if (TileService.isStart(tile)) {
                    if (!$isNull(start)) {
                        throw new DuplicateStartError();
                    }

                    start = new Node(new Position(x, y));
                } else if (TileService.isEnd(tile)) {
                    if (!$isNull(end)) {
                        throw new DuplicateEndError();
                    }

                    end = new Node(new Position(x, y));
                } else if (TileService.isEmpty(tile)) {
                    /*
                     * 0 1 2
                     * 3 X 5
                     * 6 7 8
                     */
                    const neighbours: Array<Maybe<Tile>> = TileService.getNeighbours(problem, {
                        x,
                        y
                    });

                    if (!TileService.isObstacle(neighbours[3])) {
                        if (!TileService.isObstacle(neighbours[1]) && TileService.isObstacle(neighbours[0])) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }

                        if (!TileService.isObstacle(neighbours[7]) && TileService.isObstacle(neighbours[6])) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }
                    }

                    if (!TileService.isObstacle(neighbours[5])) {
                        if (!TileService.isObstacle(neighbours[1]) && TileService.isObstacle(neighbours[2])) {
                            nodes.push(new Node(new Position(x, y)));

                            return;
                        }

                        if (!TileService.isObstacle(neighbours[7]) && TileService.isObstacle(neighbours[8])) {
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
                const isNodeStartPosition: boolean = this.isNodeAtPosition(node1, { x, y }),
                    isNodeEndPosition: boolean = this.isNodeAtPosition(node2, { x, y }),
                    isObstacle: boolean = TileService.isObstacle(problem[y][x]),
                    isStart: boolean = TileService.isStart(problem[y][x]),
                    isEnd: boolean = TileService.isEnd(problem[y][x]);

                if (!isNodeStartPosition && !isNodeEndPosition && (isObstacle || isStart || isEnd)) {
                    isConnected = false;

                    break;
                }
            }

            if (!isConnected) {
                break;
            }
        }

        return isConnected;
    }

    public static isNodeAtPosition(node: INode, { x, y }: IPosition): boolean {
        return x === node.position.x && y === node.position.y;
    }

    public addChildNode(childNode: INode): void {
        this.childNodes.push(childNode);
    }

    public toString(): string {
        return JSON.stringify(this.position);
    }
}
