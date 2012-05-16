(function (exports) {

    function Mob (params) {
        this.pathCoords = params.pathCoords;
        this.parent = params.parent;

        this.hp = params.data.hp;
        this.price = params.data.price;
        this.damage = params.data.damage;

        this.destroyed = false;
        this.active = false;

        this.pos = this.pathCoords[0];
        this.pathIndex = 0;

        this.placemark = new ymaps.Placemark(this.pos, {}, { visible: false });

        this.addToParent();
    }

    Mob.prototype = {

        activate: function () {
            this.active = true;
            this.show();
        },

        destroy: function () {
            this.destroyed = true;
            this.hide();
        },

        show: function () {
            this.placemark.options.set('visible', true);
        },

        hide: function () {
            this.placemark.options.set('visible', false);
        },

        addToParent: function () {
            this.parent.add(this.placemark);
        },

        removeFromParent: function () {
            this.parent.remove(this.placemark);
        },

        tick: function (home) {
            if (this.destroyed) {
                return;
            }

            var nextCoordinates = this.pathCoords[this.pathIndex++];
            if (nextCoordinates) {
                this.pos = nextCoordinates;
                this.placemark.geometry.setCoordinates(nextCoordinates);
                home.stab(this);
            } else {
                this.destroy();
            }
        }

    };

    exports.Mob = Mob;

})(app.lib);