(function () {

function Settings (complexity) {
    var o = Settings.complexity[complexity];
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            this[k] = o[k];
        }
    }
}

Settings.complexity = {
    easy: {
        player: {
            money: 300
        },

        home: {
            hp: 500,
            radius: 50
        },

        mobs: [
            {
                speed: 60, // м/с
                hp: 10,
                price: 5,
                damage: 1,
                preset: 'game#mob1'
            }, {
                speed: 20, // м/с
                hp: 100,
                price: 50,
                damage: 10,
                preset: 'game#mob2'
            }
        ],

        towers: [
            {
                name: 'пост ДПС',
                speed: 1, //выстрелов в секунду
                price: 100,
                sellPrice: 90,
                preset: 'game#tower1',
                damage: 5,
                radius: 150
            }
        ],

        route: {
            distance: {
                w: 0.0075,
                h: 0.005
            },
            wave: {
                duration: 60 // с
            }
        }
    },

    medium: {

    },

    hard: {

    }
};

Settings.prototype = {
    presets: {
        mobs: [
            {
                img: ''
            }
        ],

        towers: [
            {
                img: ''
            }
        ]
    },

    fps: 20
};

window.Settings = Settings;

})();