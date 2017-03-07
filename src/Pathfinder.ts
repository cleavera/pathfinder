import {Problem} from './classes/Problem';
import {Tile} from './constants/Tile.constant';

export function Pathfinder(problem: Tile[][]): void {
    let problems: Problem = new Problem(problem);

    console.log(problems.nodes);
}
