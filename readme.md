# Pathfinder

A library for finding paths through 2d mazes.

## Example

```typescript
import {Pathfinder, Tile} from 'pathfinder'

Pathfinder([
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE],
    [Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ]
]);
/* Returns:
[
    Position { x: 0, y: 1 },
    Position { x: 2, y: 1 },
    Position { x: 2, y: 0 },
    Position { x: 4, y: 0 },
    Position { x: 5, y: 1 },
    Position { x: 5, y: 3 },
    Position { x: 5, y: 4 },
    Position { x: 3, y: 4 },
    Position { x: 3, y: 3 },
    Position { x: 0, y: 3 }
]
 */
```

For a full set of examples run the examples file:
```
npm run example
```
