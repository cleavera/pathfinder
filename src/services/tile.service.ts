import { Maybe } from '@cleavera/utils';
import { Tile } from '../constants/tile.constant';
import { $get } from '../helpers/get-prop.helper';
import { IPosition } from '../interfaces/position.interface';

export class TileService {
    public static isObstacle(tile: Maybe<Tile> = null): boolean {
        return tile === Tile.OBSTACLE;
    }

    public static isStart(tile: Maybe<Tile> = null): boolean {
        return tile === Tile.START;
    }

    public static isEnd(tile: Maybe<Tile> = null): boolean {
        return tile === Tile.END;
    }

    public static isEmpty(tile: Maybe<Tile> = null): boolean {
        return tile === Tile.EMPTY;
    }

    public static getNeighbours(problem: Array<Array<Tile>>, { x, y }: IPosition): Array<Maybe<Tile>> {
        /*
         * Returns an array where the indexes correspond to the following neighbours
         * 0 1 2
         * 3 X 5
         * 6 7 8
         */

        return [
            $get<Maybe<Tile>>(problem, [y - 1, x - 1], null),
            $get<Maybe<Tile>>(problem, [y - 1, x], null),
            $get<Maybe<Tile>>(problem, [y - 1, x + 1], null),
            $get<Maybe<Tile>>(problem, [y, x - 1], null),
            null,
            $get<Maybe<Tile>>(problem, [y, x + 1], null),
            $get<Maybe<Tile>>(problem, [y + 1, x - 1], null),
            $get<Maybe<Tile>>(problem, [y + 1, x], null),
            $get<Maybe<Tile>>(problem, [y + 1, x + 1], null)
        ];
    }
}
