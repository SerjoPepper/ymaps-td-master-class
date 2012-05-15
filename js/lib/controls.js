(function () {
    function Controls (group) {
        this.group = group;
        this.controls = [];
        this.events = new ymaps.event.Manager({ context: this });

        this._startButton = new ymaps.control.Button({ data: { content: 'play' }});
        this._startButton.events.add('select', this._startButtonSelect, this);
        this._startButton.events.add('deselect', this._startButtonDeselect, this);

        this._towerButton = new ymaps.control.Button({ data: { content: 'build tower' }});
        this._towerButton.events.add('select', this._towerButtonSelect, this);
        this._towerButton.events.add('deselect', this._towerButtonDeselect, this);

        this._restartButton = new ymaps.control.Button({ data: { content: 'restart' }});
        this._restartButton.events.add('click', this._restartButtonClick, this);

        this.controls.push(this._startButton, this._towerButton, this._restartButton);
    }

    Controls.prototype = {
        addToParent: function () {
            for (var i = 0, il = this.controls.length; i < il; i++) {
                this.group.add(this.controls[i]);
            }
        },

        removeFromParent: function () {
            for (var i = 0, il = this.controls.length; i < il; i++) {
                this.group.remove(this.controls[i]);
            }
        },

        deselectPlayButton: function () {
            this._startButton.deselect();
        },

        _startButtonSelect: function () {
            this.events.fire('play');
        },

        _startButtonDeselect: function () {
            this.events.fire('stop');
        },

        _towerButtonSelect: function () {
            this.events.fire('startbuildtowers');
        },

        _towerButtonDeselect: function () {
            this.events.fire('stopbuildtowers');
        },

        _restartButtonClick: function () {
            this.events.fire('restart');
        }
    };

    window.Controls = Controls;
})();