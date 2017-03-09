"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Position_1 = require("./Position");
class Journey {
    constructor(start) {
        this._nodes = [start];
        this.distance = 0;
    }
    get path() {
        return this._nodes.map((node) => {
            return node.position;
        });
    }
    get length() {
        return this._nodes.length;
    }
    addNode(node) {
        this.distance += Position_1.Position.distance(node.position, this._nodes[this._nodes.length - 1].position);
        this._nodes.push(node);
    }
    clone() {
        let journey;
        this._nodes.forEach((node) => {
            if (!journey) {
                journey = new Journey(node);
            }
            else {
                journey.addNode(node);
            }
        });
        return journey;
    }
    hasVisited(node) {
        return this._nodes.indexOf(node) > -1;
    }
    toString() {
        return this._nodes.join(', ');
    }
}
exports.Journey = Journey;
