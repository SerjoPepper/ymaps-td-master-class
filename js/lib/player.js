(function () {

function Player (playerSettings, towerSettings, parent, me) {
    this.towers = {};
    this.data = new ymaps.data.Manager({
        money: playerSettings.money,
        kills: 0
    });
    this.towerSettings = towerSettings;
    this.me = me;
    this.data.events.add('change', this.renderStats, this);
    this.renderStats();
    this.parent = parent;
    this.collection = new ymaps.GeoObjectCollection;
}

Player.prototype = {
    addToParent: function () {
        this.parent.add(this.collection);
    },

    buyTower: function (type, coords) {
        var data = this.towerSettings[type],
            money = this.data.get('money'),
            k = coords.join(',');
        if (money >= data.price && !this.towers[k]) {
            this.towers[k] = new Tower(data, this, coords, this.collection);
            money -= data.price;
            this.data.set('money', money);
            return this.towers[k];
        }
    },

    sellTower: function (coords) {
        var tower = this.towers[coords];
        tower.removeFromMap();
        delete this.towers[coords];
        this.data.set('money', this.data.get('money') + tower.sellPrice);
    },

    tick: function () {
        for (var k in this.towers) {
            if (this.towers.hasOwnProperty(k)) {
                this.towers[k].tick();
            }
        }
//        this.render();
    },

    kill: function (mob) {
        var money = this.data.get('money') + mob.price,
            kills = this.data.get('kills') + 1;

        this.data.set({
            money: money,
            kills: kills
        });
    },

    renderStats: function () {
        $('#stats-panel .money .count').text(this.data.get('money'));
        $('#stats-panel .kills .count').text(this.data.get('kills'));
    },

    startRechargeTowers: function () {
        for (var k in this.towers) {
            if (this.towers.hasOwnProperty(k)) {
                this.towers[k].startRecharge();
            }
        }
    },

    stopRechargeTowers: function () {
        for (var k in this.towers) {
            if (this.towers.hasOwnProperty(k)) {
                this.towers[k].stopRecharge();
            }
        }
    },

    getTowersArr: function () {
        var towers = [];
        for (var k in this.towers) {
            if (this.towers.hasOwnProperty(k)) {
                towers.push(this.towers[k]);
            }
        }
        return towers;
    }
};

window.Player = Player;

})();