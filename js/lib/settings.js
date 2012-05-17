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
            ]

            /* levels */
        },

        home: {
            hp: 500,
            radius: 100,
            preset: 'game#home',
            liveColor: [0, 255, 0],
            destroyColor: [255, 0, 0],
            opacity: 'aa'
        },

        route: {
            opacity: {
                active: 0.8,
                noactive: 0.3
            }
        }

        /* mobs */
        /* fps */
    };

})(app.lib);