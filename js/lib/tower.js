(function () {

function Tower (data, player, coords, parent) {
    this.radius = data.radius;
    this.speed = data.speed;
    this.damage = data.damage;
    this.sellPrice = data.sellPrice;
    this.parent = parent;
    this.player = player;

    this.placemark = new ymaps.Placemark(coords, {
        balloonContentBody: '<button onclick="game.sellTower(\'' + coords.join(',') + '\')">' +
            'Продать за ' + this.sellPrice + '</button>'
    }, {
        preset: data.preset
    });
    this.coords = coords;
    this.circle = new ymaps.Circle([coords, this.radius]);
    this.multi = data.multi;
    this.speedIndex = 0;
    this.addToParent();

    this.recharged = true;
    this.ticker = new Ticker(1000/this.speed, this.recharge, this);
}

Tower.prototype = {
    addToParent: function (pos, map) {
        this.parent.add(this.placemark).add(this.circle);
    },

    removeFromMap: function (map) {
        this.parent.remove(this.placemark).remove(this.circle);
    },

    startRecharge: function () {
        this.ticker.start();
    },

    stopRecharge: function () {
        this.ticker.stop();
    },

    recharge: function () {
        this.recharged = true;
    },

    tick: function (mobs) {
        if ((this.speedIndex += this.speed) < 1) {
            return;
        }
        this.speedIndex -= 1;

        if (this.recharged) {
            this.punched = false;
            this.recharged = false;
        } else {
            this.punched = true;
        }
    },

    punch: function (mob) {
        if (this.punched) {
            return;
        }
        var mobPos = mob.getPos();
        if (util.circleContain(this.circle, mobPos)) {
            mob.stab(this.damage);
            mob.destroyed && this.player.kill(mob);
            if (!this.multi) {
                this.punched = true;
            }
        }
    }
};

window.Tower = Tower;

})();