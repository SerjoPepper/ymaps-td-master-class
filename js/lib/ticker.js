(function () {

function Ticker (interval, callback, ctx) {
    this.interval = interval;
    this.callback = callback;
    this.ctx = ctx;
    this.events = new ymaps.event.Manager({ context: this });
}

Ticker.prototype = {
    start: function () {
        var _this = this;

        if (this._start) {
            this.stop();
        }
        this._start = true;
        this.timer = setInterval(util.bind(function () {
            if (this.callback) {
                this.callback.call(this.ctx || null);
            }
            this.events.fire('tick');
        }, this), this.interval);
    },

    stop: function () {
        if (this._start) {
            clearInterval(this.timer);
            this.timer = null;
            this._start = false;
        }
    }
};

window.Ticker = Ticker;

})();