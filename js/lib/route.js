(function () {

function Route (params) {
    var _this = this;
    ymaps.route([getWavePoint(params.i, params.routeSettings.distance, params.homeCoords), params.homeCoords]).then(function (route) {
        // TODO нах?
        var coords = route.getPaths().get(0).geometry.getCoordinates();
        coords[coords.length - 1] = params.homeCoords;
        _this.onReady(route);
    });
    this.collection = new ymaps.GeoObjectCollection({}, { preset: 'game#route' });
    this.mobSettings = params.mobSettings;
    this.parent = params.parent;
    this.events = new ymaps.event.Manager({ context: this });
    this.routeSettings = params.routeSettings;
}

Route.prototype = {
    addToParent: function () {
        this.parent.add(this.collection);
    },

    removeFromParent: function () {
        this.parent.remove(this.collection);
    },

    getBounds: function () {
        return this.path && this.path.properties.get('boundedBy');
    },

    onReady: function (route) {
        this.path = route.getPaths().get(0);
        this.placemark = new ymaps.Placemark(this.path.geometry.getCoordinates()[0]);
        this.collection.add(this.path).add(this.placemark);

        this.events.fire('ready');
    },

    makeWave: function (waveData) {
        this.wave = new Wave({
            data: waveData,
            path: this.path,
            mobSettings: this.mobSettings,
            waveSettings: this.routeSettings.wave,
            parent: this.collection
        });
    }
};

function getWavePoint (index, settings, pos) {
    var w = settings.w,
        h = settings.h;

    return [
        [pos[0] + h, pos[1] + w],
        [pos[0] + h, pos[1] - w],
        [pos[0] - h, pos[1] - w],
        [pos[0] - h, pos[1] + w],
        [pos[0] + h, pos[1]],
        [pos[0], pos[1] - w],
        [pos[0] - h, pos[1]],
        [pos[0], pos[1] + w]
    ][index];
}

window.Route = Route;

})();

