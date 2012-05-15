(function () {

function Level (i, complexity) {
    return levels[i][complexity];
}

var levels = [
    {
        easy: {
            type: 0,
            count: 20
        },
        medium: {

        },
        hard: {

        }
    },
    {
        easy: {
            type: 1,
            count: 6
        },
        medium: {

        },
        hard: {

        }
    }
];

window.Level = Level;

})();