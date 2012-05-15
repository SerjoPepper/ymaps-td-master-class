var app = {
    init: function () {
        this.findCenter().then($.proxy(this.startGame, this));
    },
    
    startGame: function (pos) {
        this.pos = pos;
        this.map = new ymaps.Map("map", {
            behaviors: ['default', 'scrollZoom'],
            center: pos,
            zoom: 16,
            type: "yandex#map"
        });

        this.game = new this.lib.Game({ map: this.map, pos: this.pos });
        this.game.addToMap();

        this.controls = new this.lib.Controls({ map: this.map });
        this.controls.addToMap();
        this.controls.events.group()
            .add('play', this.game.play, this.game)
            .add('pause', this.game.pause, this.game)
            .add('startbuildtowers', this.game.startBuildTowers, this.game)
            .add('stopbuildtowers', this.game.stopBuildTowers, this.game)
            .add('restart', this.restartGame, this)
            .add('changelocation', this.changeLocation, this);
    },

    restartGame: function () {
        this.game.destroy();
        this.game.removeFromMap();
        this.game = new this.lib.Game({ map: this.map, pos: this.pos });
        this.game.addToMap();
    },

    changeLocation: function (e) {
        var pos = e.get('pos');
        this.map.setCenter(pos);
        this.pos = pos;
        this.restartGame();
    },

    findCenter: function () {
        var promise = new ymaps.util.Promise,
            center = [ymaps.geolocation.latitude, ymaps.geolocation.longitude];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                promise.resolve([pos.coords.latitude, pos.coords.longitude]);
            }, function () {
                promise.resolve(center);
            });
        }
        else {
            setTimeout(function () { promise.resolve(center); }, 0);
        }
        return promise;
    },

    lib: {}
};

ymaps.ready(function () {
    app.init();
});