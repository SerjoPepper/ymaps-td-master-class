(function (exports) {

    function Route (params) {
        this.events = new ymaps.event.Manager({ context: this });

        this.endPos = params.pos;
        this.startPos = [
            this.endPos[0] + params.offset[0],
            this.endPos[1] + params.offset[1]
        ];

        ymaps.route([this.startPos, this.endPos]).then(
            $.proxy(this.onRootReady, this), $.proxy(this.onRootFail, this)
        );

        this.collection = new ymaps.GeoObjectCollection({}, { preset: 'game#route' });
        this.mobSettings = params.mobSettings;
        this.parent = params.parent;
        this.events = new ymaps.event.Manager({ context: this });
        this.routeSettings = params.routeSettings;
    }

    Route.prototype = {

        activate: function () {
            this.active = true;
            this.path.options.set({ opacity: 0.8 });
        },

        addToParent: function () {
            this.parent.add(this.collection);
        },

        removeFromParent: function () {
            this.parent.remove(this.collection);
        },

        getBounds: function () {
            return this.path.properties.get('boundedBy');
        },

        createWave: function (data) {
            if (this.wave) {
                this.wave.removeFromParent()
            }

            this.wave = new exports.Wave($.extend({
                parent: this.collection,
                pathCoords: this.path.geometry.getCoordinates()
            }, data));

            this.wave.addToParent();
            return this.wave;
        },

        onRootFail: function () {
            this.events.fire('fail');
        },

        onRootReady: function (route) {
            this.path = route.getPaths().get(0);
            this.path.options.set({ opacity: 0.3 });

            var coords = this.path.geometry.getCoordinates();
            coords.push(this.endPos);

            this.placemark = new ymaps.Placemark(coords[0]);
            this.collection.add(this.path).add(this.placemark);

            this.events.fire('ready');
        }
    };

    exports.Route = Route;

})(app.lib);