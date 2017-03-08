import {Node} from './classes/Node';
import {Tile} from './constants/Tile.constant';

export function Pathfinder(problem: Tile[][]): void {
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

    nodes.forEach((node: Node) => {
       console.log('Parent: ' + node.toString());
       node.childNodes.forEach((child: Node) => {
           console.log('Child: ' + child.toString());
       });
    });
}
