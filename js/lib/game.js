(function (exports) {

    function Game (params) {
        this.collection = new ymaps.GeoObjectCollection
        this.pos = params.pos;
        this.map = params.map;
        // this.settings

        this.home = new exports.Home({
            parent: this.collection,
            pos: this.pos
        });
        this.home.addToParent();

        // this.routes

        this.events = new ymaps.event.Manager({ context: this });
    }

    Game.prototype = {

        addToMap: function () {
            this.map.geoObjects.add(this.collection);
        },

        removeFromMap: function () {
            this.map.geoObjects.remove(this.collection);
        },

        finish: function () {

        },

        play: function () {

        },

        pause: function () {

        },

        startBuildTowers: function () {

        },

        stopBuildTowers: function () {

        }

        /* getBounds */
        /* onRouteReady */
        /* onRouteFail */
        /* onReady */

    };

    exports.Game = Game;

})(app.lib);