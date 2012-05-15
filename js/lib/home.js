(function (exports) {

    function Home (params) {

        this.parent = params.parent;
        this.pos = params.pos;
        this.settings = exports.settings.home;
        this.hp = this.currentHp = this.settings.hp;

        var color = this.getColor();
        this.placemark = new ymaps.Placemark(this.pos);
        this.circle = new ymaps.Circle([this.pos, this.settings.radius], {}, {
            fillColor: color + this.settings.opacity,
            strokeColor: color
        });

        this.collection = new ymaps.GeoObjectCollection({}, { preset: 'game#home' });
        this.collection.add(this.placemark).add(this.circle);

        this.addToParent();
    }

    Home.prototype = {
        addToParent: function () {
            this.parent.add(this.collection);
        },

        removeFromParent: function () {
            this.parent.remove(this.collection);
        },

        getColor: function () {
            var k = this.currentHp/this.hp,
                c1 = parseInt(this.settings.liveColor, 16) * k,
                c2 = parseInt(this.settings.destroyColor, 16) * (1 - k),
                color = Math.round(c1 + c2).toString(16);

            while (color.length < 6) {
                color = '0' + color;
            }

            return color;
        }
    };

    exports.Home = Home;

})(app.lib);