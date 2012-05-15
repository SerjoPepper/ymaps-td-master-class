(function () {

function Home (pos, settings, parent) {
    this.data = new ymaps.data.Manager({
        hp: settings.hp
    });
    this.placemark = new ymaps.Placemark(pos);
    this.radius = settings.radius;
    this.circle = new ymaps.Circle([pos, this.radius]);
    this.parent = parent;
    this.collection = new ymaps.GeoObjectCollection({}, { preset: 'game#home' });
    this.coords = pos;
    this.collection.add(this.placemark).add(this.circle);

    this.data.events.add('change', this.renderStats, this);
    this.renderStats();
}

Home.prototype = {
    addToParent: function () {
        this.parent.add(this.collection);
    },

    removeFromParent: function () {
        this.parent.remove(this.collection);
    },

    stab: function (mob) {
        if (util.equalCoords(this.coords, mob.getPos())) {
            var hp = Math.max(this.data.get('hp') - mob.damage, 0);
            this.data.set('hp', hp);
            if (hp == 0) {
                this.destroy();
            }
            mob.destroy();
        }
    },

    destroy: function () {
        this.destroyed = true;
    },

    tick: function (mobs) {
        for (var i = 0, il = mobs.length; i < il; i++) {
            var mob = mobs[i];
            if (util.equalCoords(mob.geometry.getCoordinates(), this.coords)) {
                this.stab(mob.damage);
            }
        }
    },

    renderStats: function () {
        $('#stats-panel .hp .count').text(this.data.get('hp'));
    }
};

window.Home = Home;

})();