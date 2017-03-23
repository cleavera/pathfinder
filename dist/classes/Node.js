"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tile_constant_1 = require("../constants/Tile.constant");
const DuplicateEnd_error_1 = require("../errors/DuplicateEnd.error");
const DuplicateStart_error_1 = require("../errors/DuplicateStart.error");
const MissingEnd_error_1 = require("../errors/MissingEnd.error");
const MissingStart_error_1 = require("../errors/MissingStart.error");
const GetProp_helper_1 = require("../helpers/GetProp.helper");
const Position_1 = require("./Position");
class Node {
    constructor(position) {
        this.position = position;
        this.childNodes = [];
    }
    static extractNodes(problem) {
        let start, end, nodes = [];
        problem.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (tile === Tile_constant_1.Tile.START) {
                    if (start) {
                        throw new DuplicateStart_error_1.DuplicateStartError();
                    }
                    start = new Node(new Position_1.Position(x, y));
                }
                else if (tile === Tile_constant_1.Tile.END) {
                    if (end) {
                        throw new DuplicateEnd_error_1.DuplicateEndError();
                    }
                    end = new Node(new Position_1.Position(x, y));
                }
                else if (tile === Tile_constant_1.Tile.EMPTY) {
                    /*
                     * 0 1 2
                     * 3 X 5
                     * 6 7 8
                     */
                    let neighbours = [
                        GetProp_helper_1.$get(problem, [y - 1, x - 1], null),
                        GetProp_helper_1.$get(problem, [y - 1, x], null),
                        GetProp_helper_1.$get(problem, [y - 1, x + 1], null),
                        problem[y][x - 1],
                        null,
                        problem[y][x + 1],
                        GetProp_helper_1.$get(problem, [y + 1, x - 1], null),
                        GetProp_helper_1.$get(problem, [y + 1, x], null),
                        GetProp_helper_1.$get(problem, [y + 1, x + 1], null),
                    ];
                    if (neighbours[3] !== Tile_constant_1.Tile.OBSTACLE) {
                        if (neighbours[1] !== Tile_constant_1.Tile.OBSTACLE && neighbours[0] === Tile_constant_1.Tile.OBSTACLE) {
                            nodes.push(new Node(new Position_1.Position(x, y)));
                            return;
                        }
                        if (neighbours[7] !== Tile_constant_1.Tile.OBSTACLE && neighbours[6] === Tile_constant_1.Tile.OBSTACLE) {
                            nodes.push(new Node(new Position_1.Position(x, y)));
                            return;
                        }
                    }
                    if (neighbours[5] !== Tile_constant_1.Tile.OBSTACLE) {
                        if (neighbours[1] !== Tile_constant_1.Tile.OBSTACLE && neighbours[2] === Tile_constant_1.Tile.OBSTACLE) {
                            nodes.push(new Node(new Position_1.Position(x, y)));
                            return;
                        }
                        if (neighbours[7] !== Tile_constant_1.Tile.OBSTACLE && neighbours[8] === Tile_constant_1.Tile.OBSTACLE) {
                            nodes.push(new Node(new Position_1.Position(x, y)));
                            return;
                        }
                    }
                }
            });
        });
        if (!start) {
            throw new MissingStart_error_1.MissingStartError();
        }
        if (!end) {
            throw new MissingEnd_error_1.MissingEndError();
        }
        nodes.unshift(start);
        nodes.push(end);
        return nodes;
    }
    static isConnected(node1, node2, problem) {
        let startPosition = {
            x: node1.position.x > node2.position.x ? node2.position.x : node1.position.x,
            y: node1.position.y > node2.position.y ? node2.position.y : node1.position.y
        };
        let endPosition = {
            x: node1.position.x > node2.position.x ? node1.position.x : node2.position.x,
            y: node1.position.y > node2.position.y ? node1.position.y : node2.position.y
        };
        let isConnected = true;
        for (let x = startPosition.x; x <= endPosition.x; x++) {
            for (let y = startPosition.y; y <= endPosition.y; y++) {
                let isNodeStartPosition = x === node1.position.x && y === node1.position.y, isNodeEndPosition = x === node2.position.x && y === node2.position.y, isObstacle = problem[y][x] === Tile_constant_1.Tile.OBSTACLE, isStart = problem[y][x] === Tile_constant_1.Tile.START, isEnd = problem[y][x] === Tile_constant_1.Tile.END;
                if (!isNodeStartPosition && !isNodeEndPosition && (isObstacle || isStart || isEnd)) {
                    isConnected = false;
                    break;
                }
            }
        }
        return isConnected;
    }
    addChildNode(childNode) {
        this.childNodes.push(childNode);
    }
    toString() {
        return JSON.stringify(this.position);
    }
}
exports.Node = Node;
