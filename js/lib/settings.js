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
                    count: 20,
                    routes: 1
                }, {
                    type: 1,
                    count: 20,
                    routes: 1
                }, {
                    type: 0,
                    count: 16,
                    routes: 2
                }, {
                    type: 1,
                    count: 16,
                    routes: 2
                }
            ]
        },

        home: {
            hp: 500,
            radius: 100,
            preset: 'game#home',
            liveColor: '00ff00',
            destroyColor: 'ff0000',
            opacity: 'aa'
        },

        mobs: [
            {
                speed: 60, // м/с
                hp: 10,
                price: 5,
                damage: 1,
                preset: 'game#mob1',
                freq: 2
            }, {
                speed: 20, // м/с
                hp: 100,
                price: 50,
                damage: 10,
                preset: 'game#mob2',
                freq: 3
            }
        ],

        fps: 20
    };

})(app.lib);