(function () {
var SUBDOMAINS = ["", "a.", "b.", "c.", "d."];
//map.layers.add(stamenLayer);
map.copyrights.add({}, [{ text: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' }]);

var stamenLayer = new ymaps.Layer(
    function (coord, zoom) {
        var index = (zoom + coord[0] + coord[1]) % SUBDOMAINS.length;
        return [
            //"http://{S}tile.stamen.com/watercolor/{Z}/{X}/{Y}.jpg"
            'http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png'
                .replace("{S}", SUBDOMAINS[index])
                .replace("{Z}", zoom)
                .replace("{X}", coord[0])
                .replace("{Y}", coord[1])
        ];
    }, {
        projection: ymaps.projection.sphericalMercator,
        tileTransparent: true
    });

var map = new ymaps.Map("map", {
    behaviors: ['default', 'scrollZoom'],
    center: [55.76, 37.64],
    zoom: 11,
    type: "yandex#satellite"
}, {
    //minZoom: 3,
    //maxZoom: 16
});
})();