var app = {
    init: function () {
        this.findCenter().then($.proxy(this.startGame, this));
    },
    
    startGame: function (pos) {
        this.map = new ymaps.Map("map", {
            behaviors: ['default', 'scrollZoom'],
            center: pos,
            zoom: 16,
            type: "yandex#map"
        });
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
    }
};

ymaps.ready(function () {
    app.init();
});