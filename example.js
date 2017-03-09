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

        if (!next) {
            input[position.y][position.x] = Tile.END;
            continue;
        }

        for (var j = position.x; j < next.x; j++) {
            input[position.y][j] = '◦';
        }

        for (var k = position.y; k < next.y; k++) {
            input[k][j] = '◦';
        }

        for (var l = position.x; l > next.x; l--) {
            input[position.y][l] = '◦';
        }

        for (var m = position.y; m > next.y; m--) {
            input[m][l] = '◦';
        }

        if (!response[i - 1]) {
            input[position.y][position.x] = Tile.START;
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
    }, '') + '\n' + generateLine(input[0].length));
}

function runProblems(problems) {
    problems.forEach(function(problem) {
        console.log('\n\nProblem:');
        parseResponse(problem, []);

        var solution = Pathfinder(problem);

        if (!solution) {
            console.log('No solution');

            return;
        }

        console.log('Solution: ' + solution.map(function(waypoint) {
                return '[' + waypoint.x + ', ' + waypoint.y + ']';
            }).join(', '));
        parseResponse(problem, solution);
    });
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
    ],
    [
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.EMPTY   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ]
    ],
    [
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.START   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ],
        [Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.END     , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   ]
    ]
];

runProblems(problems);