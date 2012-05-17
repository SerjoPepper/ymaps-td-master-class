(function (exports) {

    function Game (params) {
        this.collection = new ymaps.GeoObjectCollection;
        this.pos = params.pos;
        this.map = params.map;
        this.settings = exports.settings.game;

        this.home = new exports.Home({
            parent: this.collection,
            pos: this.pos
        });
        this.home.addToParent();

        this.routes = [];
        this.readyRoutesCount = 0;
        this.failRoutesCount = 0;


        for (var i = 0; i < this.settings.routes.length; i++) {
            var route = new exports.Route(
                $.extend({
                    pos: this.pos,
                    parent: this.collection
                }, this.settings.routes[i])
            );
            route.events.group()
                 .add('ready', this.onRootReady, this)
                 .add('fail', this.onRootFail, this);
        }

        this.events = new ymaps.event.Manager({ context: this });
        this.ticker = new exports.Ticker(1000 / exports.settings.fps, this.tick, this);

        this.levels = exports.settings.game.levels;
        this.levelIndex = 0;

        this.finished = false;
    }

    Game.prototype = {

        addToMap: function () {
            this.map.geoObjects.add(this.collection);
        },

        removeFromMap: function () {
            this.map.geoObjects.remove(this.collection);
        },

        finish: function () {
            this.pause();
            this.finished = true;
            this.events.fire('finish');
        },

        play: function () {
            // play waves
            this.ticker.play();
        },

        pause: function () {
            // pause waves
            this.ticker.pause();
        },

        tick: function () {
            // tick waves
        },

        /* finishLevel */
        /* createCurrentWaves */

        startBuildTowers: function () {

        },

        stopBuildTowers: function () {

        },

        getBounds: function () {
            var b1 = this.routes[0].getBounds();
            for (var i = 1, il = this.routes.length; i < il; i++) {
                var b2 = this.routes[i].getBounds();
                b1 = [
                    [Math.min(b1[0][0], b2[0][0]), Math.min(b1[0][1], b2[0][1])],
                    [Math.max(b1[1][0], b2[1][0]), Math.max(b1[1][1], b2[1][1])]
                ];
            }
            return b1;
        },

        onRootReady: function (e) {
            var route = e.get('target');
            this.routes.push(route);
            route.addToParent();
            if (++this.readyRoutesCount + this.failRoutesCount == this.settings.routes.length) {
                this.onReady();
            }
        },
        
        onRootFail: function (e) {
            if (this.readyRoutesCount + ++this.failRoutesCount == this.settings.routes.length) {
                this.onReady();
            }
        },

        onReady: function () {
            if (this.routes.length == 0) {
                this.events.fire('noroutesfound');
                this.finished = true;
            } else {
                // current waves
                this.map.setBounds(this.getBounds());
                this.events.fire('ready');
            }
        }

    };

    exports.Game = Game;

})(app.lib);