var app = {
    init: function () {
        this.startGame([ymaps.geolocation.latitude, ymaps.geolocation.longitude]);
    },

    startGame: function (pos) {
        this.pos = pos;
        this.map = new ymaps.Map("map", {
            behaviors: ['default', 'scrollZoom'],
            center: pos,
            zoom: 16,
            type: "yandex#map"
        });
    },

    lib: {}
};

ymaps.ready(function () {
    app.init();
});