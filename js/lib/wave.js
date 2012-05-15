function Wave (params) {
    console.log(params);
    var mobData = params.mobSettings[params.data.type];

    this.parent = params.parent;
    this.collection = new ymaps.GeoObjectCollection({}, {
        preset: mobData.preset,
        overlayFactory: ymaps.geoObject.overlayFactory.staticGraphics,
        zIndex: 1000
    });

    this.speed = mobData.speed;
    this.mobs = [];
    this.mobPath = this.calculateMobPath(params.path);
    for (var i = 0, il = params.data.count; i < il; i++) {
        this.mobs.push(new Mob(mobData, this.collection, this.mobPath));
    }
//    this.duration = ;
//    this.mobTicks = waveSettings.ticks/data.count;
    this.activeMobIndex = 0;
    this.addToParent();

    this.ticker = new Ticker(1000 * params.waveSettings.duration/params.data.count, this.activateMobs, this);
}

Wave.prototype = {
    stop: function () {
        this.ticker.stop();
    },

    start: function () {
        this.ticker.start();
    },

    addToParent: function () {
        this.parent.add(this.collection);
    },

    removeFromParent: function () {
        this.parent.remove(this.collection);
    },

    activateMobs: function () {
        if (this.activeMobIndex < this.mobs.length/* && this.tickIndex++ % this.mobTicks == 0*/) {
            this.mobs[this.activeMobIndex++].activate();
        } else {
            this.ticker.stop();
        }
    },

    tick: function () {
        for (var i = 0, il = this.mobs.length; i < il; i++) {
            if (this.mobs[i].active) {
                this.mobs[i].tick();
            }
        }
    },

    calculateMobPath: function (path) {
        var coords = path.geometry.getCoordinates(),
            mobPath = [],
            tlen = 0,
            speed = this.speed/window.fps;

        //debugger;

        for (var i = 0, il = coords.length - 1; i < il; i++) {
            var k,
                vec = [coords[i + 1][0] - coords[i][0], coords[i + 1][1] - coords[i][1]],
                len = util.distance(coords[i], coords[i + 1]);

            tlen += len;

            while(tlen > 0) {
                k = 1 - tlen/len;
                mobPath.push([coords[i][0] + vec[0] * k, coords[i][1] + vec[1] * k]);
                tlen -= speed;
            }
        }

        mobPath.push(coords[il]);

        return mobPath;
    },

    getMobs: function () {
        return this.mobs;
    }
};
