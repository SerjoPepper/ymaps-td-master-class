(function (exports) {

    function Game (params) {
        this.collection = new ymaps.GeoObjectCollection
        this.pos = params.pos;
        this.map = params.map;

        this.home = new exports.Home({
            parent: this.collection,
            pos: this.pos
        });
    }

    Game.prototype = {

        addToMap: function () {
            this.map.geoObjects.add(this.collection);
        },

        removeFromMap: function () {
            this.map.geoObjects.remove(this.collection);
        },

        destroy: function () {

        },

        play: function () {

        },

        pause: function () {

        },

        startBuildTowers: function () {

        },

        stopBuildTowers: function () {

        }

    };

    exports.Game = Game;

})(app.lib);