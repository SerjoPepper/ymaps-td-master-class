var app = {
    init: function () {
        this.findCenter().then($.proxy(this.startGame, this));
    },
    
    startGame: function (pos) {
        
    },

    findCenter: function () {

    },

    lib: {}
};

ymaps.ready(function () {
    app.init();
});