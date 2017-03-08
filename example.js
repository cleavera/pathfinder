var lib = require('./dist/index');
var Pathfinder = lib.Pathfinder;
var Tile = lib.Tile;

function generateLine(length) {
    var out = '■';

    for (var x = 0; x <= length; x++) {
        out += '■';
    }

    return out;
}

function parseResponse(input, response) {
    for (var i = 0; i < response.length; i++) {
        var position = response[i],
            next = response[i + 1];

        if (input[position.y][position.x] !== Tile.EMPTY) {
            continue;
        }

        if (position.x === next.x) {
            if (position.y < next.y) {
                input[position.y][position.x] = '▾';
            } else {
                input[position.y][position.x] = '▴';
            }
        } else if (position.y === next.y) {
            if (position.x < next.x) {
                input[position.y][position.x] = '▸';
            } else {
                input[position.y][position.x] = '◂';
            }
        } else if (position.x > next.x) {
            if (position.y < next.y) {
                input[position.y][position.x] = '▫';
            } else {
                input[position.y][position.x] = '▫';
            }
        } else if (position.x < next.x) {
            if (position.y < next.y) {
                input[position.y][position.x] = '▫';
            } else {
                input[position.y][position.x] = '▫';
            }
        }
    }

    console.log(input.reduce(function(acc, horizontal) {
        return (acc ? acc + '\n■' : generateLine(horizontal.length) +'\n■') + horizontal.reduce(function(acc, point) {
            if (point === Tile.START) {
                point = 'S';
            } else if (point === Tile.END) {
                point = 'E';
            } else if (point === Tile.EMPTY) {
                point = ' ';
            } else if (point === Tile.OBSTACLE) {
                point = '■';
            }

            return acc + point;
        }, '') + '■';
    }, '') + '\n' + generateLine(input[0].length) + '\n\n');
}

var problems = [
    [
        [Tile.START, Tile.EMPTY, Tile.EMPTY],
        [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
        [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
        [Tile.EMPTY, Tile.EMPTY, Tile.END  ]
    ],
    [
        [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.END  ]
    ],
    [
        [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   ],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE]
    ],
    [
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ]
    ],
    [
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   ],
        [Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ]
    ]
];

parseResponse(problems[0], Pathfinder(problems[0]));
parseResponse(problems[1], Pathfinder(problems[1]));
parseResponse(problems[2], Pathfinder(problems[2]));
parseResponse(problems[3], Pathfinder(problems[3]));
parseResponse(problems[4], Pathfinder(problems[4]));
