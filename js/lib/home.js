(function (exports) {

    function Home (params) {
        this.parent = params.parent;
        this.pos = params.pos;
        this.settings = exports.settings.home;
        this.hp = this.currentHp = this.settings.hp;

        var color = this.getColor();
        this.placemark = new ymaps.Placemark(this.pos);
        this.circle = new ymaps.Circle([this.pos, this.settings.radius]);
        this.setState();

        this.collection = new ymaps.GeoObjectCollection({}, { preset: 'game#home' });
        this.collection.add(this.placemark).add(this.circle);

        // this.destroyed = false;
    }

    Home.prototype = {
        addToParent: function () {
            this.parent.add(this.collection);
        },

        removeFromParent: function () {
            this.parent.remove(this.collection);
        },

        getColor: function () {
            var k1 = this.currentHp/this.hp,
                k2 = 1 - k1,
                c1 = this.settings.liveColor,
                c2 = this.settings.destroyColor,
                f = Math.floor,
                color = [
                    f(c1[0]*k1+c2[0]*k2).toString(16),
                    f(c1[1]*k1+c2[1]*k2).toString(16),
                    f(c1[2]*k1+c2[2]*k2).toString(16)
                ];

            for (var i = 0, il = color.length; i < il; i++) {
                while (color[i].length < 2) {
                    color[i] = '0' + color[i];
                }
            }

            return color.join('');
        },

        setState: function () {
            var color = this.getColor();
            this.circle.options.set({
                fillColor: color + this.settings.opacity,
                strokeColor: color
            });
        }

        /*stab*/
    };

    exports.Home = Home;

})(app.lib);