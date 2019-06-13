const { Pathfinder, Tile } = require('./dist/index');

function generateLine(length) {
    let out = '■';

    for (let x = 0; x <= length; x++) {
        out += '■';
    }

    return out;
}

function parseResponse(input, response) {
    for (let i = 0; i < response.length; i++) {
        const position = response[i],
            next = response[i + 1];

        if (!next) {
            input[position.y][position.x] = Tile.END;
            continue;
        }

        let j,
            l;

        for (j = position.x; j < next.x; j++) {
            input[position.y][j] = '◦';
        }

        for (let k = position.y; k < next.y; k++) {
            input[k][j] = '◦';
        }

        for (l = position.x; l > next.x; l--) {
            input[position.y][l] = '◦';
        }

        for (let m = position.y; m > next.y; m--) {
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

        const solution = Pathfinder(problem);

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

const problems = [
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
    ],
    [
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.START   , Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.EMPTY   , Tile.OBSTACLE],
        [Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.END     , Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE, Tile.OBSTACLE],
    ]
];

runProblems(problems);
