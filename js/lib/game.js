(function (exports) {

    function Game () {
        // add collection
        // handle params
        // add home

        this.events = new ymaps.event.Manager({ context: this });
    }

    Game.prototype = {

        addToMap: function () {
            // add collection
        },

        removeFromMap: function () {
            // remove collection
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

    };

    exports.Game = Game;

})(app.lib);