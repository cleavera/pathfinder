import {Journey} from './classes/Journey';
import {Node} from './classes/Node';
import {Tile} from './constants/Tile.constant';
import {IJourney} from './interfaces/IJourney.interface';
import {INode} from './interfaces/INode.interface';
import {IPosition} from './interfaces/IPosition.interface';

function traverse(node: INode, endNode: INode, journey?: IJourney): IJourney {
    if (!journey) {
        journey = new Journey(node);
    } else {
        journey.addNode(node);
    }

    if (node === endNode) {
        return journey;
    }

    let best: IJourney;

    node.childNodes.forEach((childNode: INode) => {
        if (!journey.hasVisited(childNode)) {
            if (!best) {
                best = traverse(childNode, endNode, journey);
            } else {
                let newJourney: IJourney = traverse(childNode, endNode, journey.clone());

                if (newJourney && newJourney.distance < best.distance) {
                    best = newJourney;
                }
            }
        }
    });

    return best;
}

export function Pathfinder(problem: Tile[][]): IPosition[] {
    let nodes: Node[] = Node.extractNodes(problem);

    nodes.forEach((node1: Node) => {
        nodes.forEach((node2: Node) => {
           if (Node.isConnected(node1, node2, problem)) {
               if (node1 !== node2) {
                   node1.addChildNode(node2);
               }
           }
        });
    });

    return traverse(nodes[0], nodes[nodes.length - 1]).path;
}
