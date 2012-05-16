(function (exports) {

    function Player (params) {
        this.parent = params.parent;
        this.money = exports.settings.player.money;
        this.kills = 0;
        this.towers = {};
        this.collection = new ymaps.GeoObjectCollection;
    }

    Player.prototype = {

        addToParent: function () {
            this.parent.add(this.collection);
        },

        removeFromParent: function () {
            this.parent.remove(this.collection);
        },

        buyTower: function (type, pos) {
            var data = exports.settings.towers[type],
                k = pos.join(',');
            if (this.money >= data.price && !this.towers[k]) {
                var tower = new exports.Tower($.extend({
                    pos: pos,
                    parent: this.collection,
                    owner: this
                }, data));
                this.towers[k] = tower;
                tower.addToParent();
                this.money -= data.price;
                return this.towers[k];
            }
        },

        sellTower: function (k) {
            var tower = this.towers[k];
            tower.removeFromParent();
            delete this.towers[k];
            this.money += tower.sellPrice;
        },

        tick: function () {
            for (var k in this.towers) {
                this.towers[k].tick();
            }
        },

        startRecharge: function () {
            for (var k in this.towers) {
                this.towers[k].startRecharge();
            }
        },

        stopRecharge: function () {
            for (var k in this.towers) {
                this.towers[k].startRecharge();
            }
        }
    };

    exports.Player = Player;

})(app.lib);