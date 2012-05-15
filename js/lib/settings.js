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
                    count: 20
                }, {
                    type: 1,
                    count: 20
                }, {
                    type: 2,
                    count: 10
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
        }
    };

})(app.lib);