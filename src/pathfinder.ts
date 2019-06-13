import { $isNull, Maybe } from '@cleavera/utils';
import { Journey } from './classes/journey';
import { Node } from './classes/node';
import { Tile } from './constants/tile.constant';
import { $get } from './helpers/get-prop.helper';
import { IJourney } from './interfaces/journey.interface';
import { INode } from './interfaces/node.interface';
import { IPosition } from './interfaces/position.interface';

function traverse(node: INode, endNode: INode, journey: Maybe<IJourney> = null): Maybe<IJourney> {
    if ($isNull(journey)) {
        journey = new Journey(node);
    } else {
        journey.addNode(node);
    }

    if (node === endNode) {
        return journey;
    }

    let best: Maybe<IJourney> = null;

    node.childNodes.forEach((childNode: INode) => {
        if ($isNull(journey)) {
            throw '';
        }

        if (!journey.hasVisited(childNode)) {
            if (!best) {
                best = traverse(childNode, endNode, journey.clone());
            } else {
                let newJourney: Maybe<IJourney> = traverse(childNode, endNode, journey.clone());

                if (!$isNull(newJourney) && (newJourney.distance < best.distance || (newJourney.distance === best.distance && newJourney.length < best.length))) {
                    best = newJourney;
                }
            }
        }
    });

    return best;
}

export function Pathfinder(problem: Tile[][]): IPosition[] {
    let nodes: Node[] = Node.ExtractNodes(problem);

    nodes.forEach((node1: Node) => {
        nodes.forEach((node2: Node) => {
            if (Node.isConnected(node1, node2, problem)) {
                if (node1 !== node2) {
                    node1.addChildNode(node2);
                }
            }
        });
    });

    return $get(traverse(nodes[0], nodes[nodes.length - 1]), ['path'], null);
}
