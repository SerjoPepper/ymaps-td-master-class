(function (exports) {

    function  Tower (params) {
        this.radius = params.radius;
        this.speed = params.speed;
        this.damage = params.damage;
        this.sellPrice = Math.round(params.price * 0.9);
        this.parent = params.parent;
        this.owner = params.owner;
        this.pos = params.pos;

        this.placemark = new ymaps.Placemark(this.pos, {
            balloonContentBody: this.getBalloonContentBody()
        });
        this.circle = new ymaps.Circle([this.pos, this.radius], {}, {
            interactivityModel: 'default#transparent'
        });
        this.multi = params.multi;
        this.ticker = new exports.Ticker(1000/this.speed, this.recharge, this);
        this.collection = new ymaps.GeoObjectCollection({}, { preset: params.preset });
        this.collection.add(this.placemark).add(this.circle);

        this.speedIndex = 0;
        this.punched = false;
        this.punchedMulti = true;
    }

    Tower.prototype = {

        addToParent: function () {
            this.parent.add(this.collection);
        },

        removeFromParent: function () {
            this.parent.remove(this.collection);
        },

        startRecharge: function () {
            this.ticker.play();
        },

        stopRecharge: function () {
            this.ticker.pause();
        },

        recharge: function () {
            this.punched = false;
            this.punchedMulti = false;
        },

        getBalloonContentBody: function () {
            return '<button onclick="app.game.sellTower(\'' + this.pos.join(',') + '\')">' +
                'Продать за ' + this.sellPrice + '</button>';
        },

        tick: function () {
            if (this.punchedMulti) {
                this.punched = true;
            }
        },

        punch: function (mob) {
            if (this.punched) {
                return;
            }

            if (exports.util.circleContain(this.circle, mob.pos)) {
                var killmob = mob.stab(this.damage);
                if (killmob) {
                    this.owner.kill(mob);
                }
                if (this.multi) {
                    this.punchedMulti = true;
                } else {
                    this.punched = true;
                }
            }
        }

    };

    exports.Tower = Tower;

})(app.lib);