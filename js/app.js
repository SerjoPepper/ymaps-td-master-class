function App () {

}

App.prototype = {
    start: function () {
        this.params = {
            routeCount: 1,
            levelsCount: 2,
            complexity: 'easy'
        };

        this._findCenter().then(util.bind(this._startGame, this));
    },

    _startGame: function (pos) {
        this.map = new ymaps.Map("map", {
            behaviors: ['default', 'scrollZoom'],
            center: pos,
            zoom: 16,
            type: "yandex#map"
        }, {
            //minZoom: 3,
            //maxZoom: 16
        });

        this.params.homeCoords = pos;
        this.params.map = this.map;
        this._createGame();
        this.game.addToMap();
    },

    _createGame: function () {
        this.game = window.game = new Game(this.params);
        this.game.events.group().add('restart', this._onGameRestart, this);
    },

    _onGameRestart: function () {
        this.game.destroy();
        this._createGame();
        this.game.addToMap();
    },

    _findCenter: function () {
        var promise = new ymaps.util.Promise,
            center = [ymaps.geolocation.latitude, ymaps.geolocation.longitude];
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                promise.resolve([position.coords.latitude, position.coords.longitude]);
            }, function () {
                promise.resolve(center);
            });
        }
        else {
            setTimeout(function () { promise.resolve(center); }, 0);
        }
        return promise;
    }
};


ymaps.ready(function () {
    (new App()).start();
});