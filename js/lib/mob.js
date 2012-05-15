(function () {

function Mob (data, parent, pathCoords) {
    this.pos = pathCoords[0];
    this.placemark = new ymaps.Placemark(this.pos, {}, { visible: false });
    this.parent = parent;
    this.parent.add(this.placemark);

    this.speed = data.speed;
    this.hp = data.hp;
    this.price = data.price;
    this.damage = data.damage;

    this.destroyed = false;

    this.pathIndex = 0;
    this.pathCoords = pathCoords;
}

Mob.prototype = {
    activate: function () {
        this.show();
        this.active = true;
    },

    show: function () {
        this.placemark.options.set({ visible: true });
    },

    hide: function () {
        this.placemark.options.set({ visible: false });
    },

    tick: function () {
        if (this.destroyed) {
            return;
        }

        var nextCoordinates = this.pathCoords[this.pathIndex++];
        if (nextCoordinates) {
            this.pos = nextCoordinates;
            this.placemark.geometry.setCoordinates(nextCoordinates);
        }
    },

    stab: function (damage) {
        if((this.hp -= damage) <= 0) {
            this.destroy();
        }
    },

    destroy: function () {
        this.destroyed = true;
        this.hide();
    },

    getPos: function () {
        return this.pos;
    }
};

window.Mob = Mob;

})();