"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Journey_1 = require("./classes/Journey");
const Node_1 = require("./classes/Node");
const GetProp_helper_1 = require("./helpers/GetProp.helper");
function traverse(node, endNode, journey) {
    if (!journey) {
        journey = new Journey_1.Journey(node);
    }
    else {
        journey.addNode(node);
    }
    if (node === endNode) {
        return journey;
    }
    let best;
    node.childNodes.forEach((childNode) => {
        if (!journey.hasVisited(childNode)) {
            if (!best) {
                best = traverse(childNode, endNode, journey.clone());
            }
            else {
                let newJourney = traverse(childNode, endNode, journey.clone());
                if (newJourney && (newJourney.distance < best.distance || (newJourney.distance === best.distance && newJourney.length < best.length))) {
                    best = newJourney;
                }
            }
        }
    });
    return best;
}
function Pathfinder(problem) {
    let nodes = Node_1.Node.extractNodes(problem);
    nodes.forEach((node1) => {
        nodes.forEach((node2) => {
            if (Node_1.Node.isConnected(node1, node2, problem)) {
                if (node1 !== node2) {
                    node1.addChildNode(node2);
                }
            }
        });
    });
    return GetProp_helper_1.$get(traverse(nodes[0], nodes[nodes.length - 1]), ['path'], null);
}
exports.Pathfinder = Pathfinder;
