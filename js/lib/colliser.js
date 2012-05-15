(function () {
function Colliser (mobs, home) {
    this.mobs = mobs;
    this.home = home;

    this.events = new ymaps.event.Manager({ context: this });
}

Colliser.prototype = {
    tick: function (towers) {
        for (var i = 0, alive = 0, il = this.mobs.length; i < il; i++) {
            var mob = this.mobs[i];
            if (!mob.destroyed) {
                alive++;
            }
            if (mob.destroyed || !mob.active) {
                continue;
            }
            for (var j = 0, jl = towers.length; j < jl; j++) {
                var tower = towers[j];
                tower.punch(mob);
            }
            this.home.stab(mob);
            if (this.home.destroyed) {
                this.events.fire('homeDestroy');
                break;
            }
        }
        if (alive == 0) {
            this.events.fire('levelEnd')
        }
    }
};

window.Colliser = Colliser;
})();