(function (exports) {

    function Ticker (interval, callback, ctx) {
        this.interval = interval;
        this.callback = callback;
        this.ctx = ctx;
        this.events = new ymaps.event.Manager({ context: this });
    }

    Ticker.prototype = {
        play: function () {
            if (this.started) {
                return;
            }
            this.started = true;
            this.timer = setInterval($.proxy(function () {
                if (this.callback) {
                    this.callback.call(this.ctx || null);
                }
                this.events.fire('tick');
            }, this), this.interval);
        },

        pause: function () {
            if (this.started) {
                clearInterval(this.timer);
                this.timer = null;
                this.started = false;
            }
        }
    };

    exports.Ticker = Ticker;

})(app.lib);