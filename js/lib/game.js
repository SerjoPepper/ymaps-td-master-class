(function () {
function Game (params) {
    var i;
    var collection = this.gameCollection = new ymaps.GeoObjectCollection;

    this.map = params.map;
    this.settings = new Settings(params.complexity);
    window.fps = this.settings.fps;
    this.home = new Home(params.homeCoords, this.settings.home, collection);

    this.routes = [];
    this.routes.readyLength = 0;
    for (i = 0; i < params.routeCount; i++) {
        var route = new Route({
            homeCoords: params.homeCoords,
            i: i,
            mobSettings: this.settings.mobs,
            routeSettings: this.settings.route,
            parent: collection
        });
        route.events.add('ready', this._onRootReady, this);
        this.routes.push(route);
    }

    this.levels = [];
    this.levelIndex = 0;
    for (i = 0; i < params.levelsCount; i++) {
        this.levels.push(new Level(i, params.complexity));
    }

    this.player = new Player(this.settings.player, this.settings.towers, collection, true);

    this.ticker = new Ticker(1000/this.settings.fps, this.tick, this);
    this.ticker.events.add('tick', this.tick, this);
    this.events = new ymaps.event.Manager({ context: this });

    this.gameControlCollection = new ymaps.control.Group();
    this.controls = new Controls(this.gameControlCollection);

    this._bindEvents();
}

Game.prototype = {
    addToMap: function () {
        this.routes.map(function (route) { route.addToParent(); });
        this.player.addToParent();
        this.home.addToParent();
        this.controls.addToParent();
        this.map.geoObjects.add(this.gameCollection);
        this.map.controls.add(this.gameControlCollection);
    },

    destroy: function () {
        this.pause();
        this._stopBuildTowers();
        this.map.geoObjects.remove(this.gameCollection);
        this.map.controls.remove(this.gameControlCollection);
    },

    getBounds: function () {
        var b1 = this.routes[0].getBounds();
        for (var i = 1, il = this.routes.length; i < il; i++) {
            var b2 = this.routes[1].getBounds();
            b1 = [
                [Math.min(b1[0][0], b2[0][0]), Math.min(b1[0][1], b2[0][1])],
                [Math.max(b1[1][0], b2[1][0]), Math.max(b1[1][1], b2[1][1])]
            ];
        }
        return b1;
    },

    play: function () {
        if (!this._lost) {
            this._played = true;
            this.ticker.start();
            this.routes.map(function (route) {
                route.wave.start();
            });
            this.player.startRechargeTowers();
        }
    },

    pause: function () {
        this._played = false;
        this.ticker.stop();
        this.routes.map(function (route) {
            route.wave.stop();
        });
        this.player.stopRechargeTowers();
    },

    tick: function () {
        this.player.tick();
        for (var i = 0, il = this.routes.length; i < il; i++) {
            this.routes[i].wave.tick();
        }
        this.colliser.tick(this.player.getTowersArr());
    },

    makeLevel: function () {
        this.renderStats();
        var levelData = this.levels[this.levelIndex],
            mobs = [];

        for (var i = 0, il = this.routes.length; i < il; i++) {
            console.log('make wave')
            this.routes[i].makeWave(levelData);
            var routeMobs = this.routes[i].wave.getMobs();
            for (var j = 0, jl = routeMobs.length; j < jl; j++) {
                mobs[i + il * j] = routeMobs[j];
            }
        }
        this.colliser = new Colliser(mobs, this.home);
        this.colliser.events.group()
            .add('levelEnd', this._onLevelEnd, this)
            .add('homeDestroy', this._onHomeDestroy, this);
    },

    _onLevelEnd: function () {
        this.controls.deselectPlayButton();
        if (++this.levelIndex < this.levels.length) {
            this.makeLevel();
        }
    },

    _onHomeDestroy: function () {
        this.pause();
        this._lost = true;
    },

    renderStats: function () {
        $('#stats-panel .level .index').text(this.levelIndex + 1);
    },

    _bindEvents: function () {
        this._controlEvents = this.controls.events.group()
            .add('play', this.play, this)
            .add('stop', this.pause, this)
            .add('startbuildtowers', this._startBuildTowers, this)
            .add('stopbuildtowers', this._stopBuildTowers, this)
            .add('restart', this._restart, this);
    },
    
    _onRootReady: function (root) {
        if (++this.routes.readyLength == this.routes.length) {
            //this.events.fire('routesReady');
            this.map.setBounds(this.getBounds());
            this.makeLevel();
        }
    },

    _startBuildTowers: function () {
        this._buildTowerEvents = this.map.events.group()
            .add('click', this._openBuyTowerBalloon, this);
    },

    _stopBuildTowers: function () {
        if (this._buildTowerEvents) {
            this._buildTowerEvents.removeAll();
        }
    },

    _openBuyTowerBalloon: function (e) {
        var coords = e.get('coordPosition'),
            _this = this;
        ymaps.geocode(coords, { kind: 'house', results: 1 }).then(function (res) {
            var point = res.geoObjects.get(0);
            if (point) {
                _this._currentBuyCoords = point.geometry.getCoordinates();
                _this.map.balloon.open(_this._currentBuyCoords, {
                    contentBody: _this._getContentBody()
                });
            }
        });
    },

    _restart: function () {
        this.events.fire('restart');
    },

    _getContentBody: function () {
        var towers = this.settings.towers,
            body = '',
            options = new ymaps.option.Manager;

        for (var i = 0, il = towers.length; i < il; i++) {
            var tower = towers[i];
            options.set('preset', tower.preset);
            body += '<div class="buy-tower">' +
                '<div class="buy-tower-left">' +
                '<p class="tower-name">' + tower.name + '</p>' +
                '<img class="tower-img" src="'+ options.get('iconImageHref') +'"/>' +
                '</div>' +
                '<div class="buy-tower-right">' +
                '<p class="tower-damage">урон: ' + tower.damage + '</p>' +
                '<p class="tower-radius">радиус: ' + tower.radius + '</p>' +
                '<p class="tower-speed">скорость: ' + tower.speed + '</p>' +
                '<p class="tower-price">цена: ' + tower.price + '</p>' +
                '<button class="buy-button" onclick="game.buyTower(' + i + ')">Купить</button>' +
                '</div>' +
                '</div>'
                options.get('iconImageHref');
        }

        return body;
    },

    buyTower: function (type) {
        var tower = this.player.buyTower(type, this._currentBuyCoords);
        if (tower) {
            this.map.balloon.close();
            if (this._played) {
                tower.startRecharge();
            }
        }
    },

    sellTower: function (coords) {
        this.player.sellTower(coords);
    }
};

window.Game = Game;

})();