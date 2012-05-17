(function (exports) {

    exports.settings = {

        game: {
            routes: [
                {
                    offset: [0.0075, 0.005],
                    preset: 'game#route'
                }, {
                    offset: [-0.0075, 0.005],
                    preset: 'game#route'
                }, {
                    offset: [-0.0075, -0.005],
                    preset: 'game#route'
                }, {
                    offset: [0.0075, -0.005],
                    preset: 'game#route'
                }
            ],

            levels: [
                {
                    type: 0,
                    count: 1,
                    routes: 2
                }, {
                    type: 1,
                    count: 2,
                    routes: 1
                }, {
                    type: 0,
                    count: 8,
                    routes: 2
                }, {
                    type: 1,
                    count: 8,
                    routes: 2
                }
            ]
        },

        home: {
            hp: 500,
            radius: 100,
            preset: 'game#home',
            liveColor: [0, 255, 0],
            destroyColor: [255, 0, 0],
            opacity: 'aa'
        },

        mobs: [
            {
                speed: 150, // м/с
                hp: 10,
                price: 5,
                damage: 250,
                preset: 'game#mob1',
                freq: 4
            }, {
                speed: 20, // м/с
                hp: 100,
                price: 50,
                damage: 10,
                preset: 'game#mob2',
                freq: 3
            }
        ],

        fps: 10,

        route: {
            opacity: {
                active: 0.8,
                noactive: 0.3
            }
        }

        /*player*/
        /*money*/
    };

})(app.lib);