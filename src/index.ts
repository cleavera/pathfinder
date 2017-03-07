import {Tile} from './constants/Tile.constant';
import {Pathfinder} from './Pathfinder';

Pathfinder([
    [Tile.START, Tile.EMPTY, Tile.EMPTY],
    [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
    [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
    [Tile.EMPTY, Tile.EMPTY, Tile.END  ]
]);

Pathfinder([
    [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY],
    [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY],
    [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY],
    [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.END  ]
]);

Pathfinder([
    [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   ],
    [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE]
]);

Pathfinder([
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE],
    [Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   ],
    [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ]
]);
