ymaps.ready(function () {

    var storage = ymaps.option.presetStorage;

    storage.add('game#home', {
        opacity: 0.6,
        preset: 'twirl#houseIcon'
    });

    storage.add('game#route', {
        strokeWidth: 8,
        preset: 'twirl#campingIcon'
    });

    storage.add('game#mob1', {
        preset: 'twirl#mushroomIcon'
    });

    storage.add('game#mob2', {
        preset: 'twirl#theaterIcon'
    });

});