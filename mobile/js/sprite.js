(function() {

    var _events = {

        /**
         * On audio file load
         */
        onLoad: function() {
            this._loaded = true;
            this.el.removeEventListener('progress', this._ph, false);
            this.trigger('onloaded');
        },

        /**
         * On buffer
         */
        onLoadProgress: function() {
            var loaded = 0;
            var duration = 1;

            try {
                loaded = this.el.buffered.end(0);
                duration = this.el.duration;
            } catch(e) {}
            // round percent
            var percent = ~~((loaded / duration) * 100);

            this.loaded = percent;
            this.trigger('onload', percent);
            if (this.loaded === 100) {
                _events.onLoad.call(this);
            }
        },

        /**
         * On progress
         */
        onProgress: function() {
            if (!this._loaded) {
                return;
            }

            this.trigger('progress ' + this._current + ':progress', this.el.currentTime);
            if (this.el.currentTime >= this._end) {
                this.stop();
                var current = this._current;
                this._current = null;
                this.trigger('complete ' + current + ':complete');
            }
        },

        /**
         * on audio play
         */
        onPlay: function() {
            this.trigger('play ' + this._current + ':play');
            _events.onProgress.call(this);
        },

        /**
         * on audio stop
         */
        onStop: function() {
            _events.onProgress.call(this);
            this.trigger('stop ' + this._current + ':stop');
        },

        /**
         * on audio error
         */
        onError: function(a) {

        },

        /**
         * on load start
         */
        onLoadStart: function() {
            this.trigger('loadstart');
        }
    };

    /**
     * Audio Sprite Object
     * @param {DOM Element} audioEl
     * @param {array} spriteData
     */
    function AudioSprite(audioEl, spriteData) {
        this.el = audioEl;
        this._data = spriteData;
        this._loaded = false;
        this.loaded = 0;

        this._ph = _events.onLoadProgress.bind(this);
//        this.el.addEventListener('loadstart', _events.onLoadStart.bind(this), false);
        this.el.addEventListener('progress', this._ph, false);
        //this.el.addEventListener('canplaythrough', _events.onLoad.bind(this), false);
        this.el.addEventListener('play', _events.onPlay.bind(this), false);
        this.el.addEventListener('timeupdate', _events.onProgress.bind(this), false);
        this.el.addEventListener('pause', _events.onStop.bind(this), false);
        this.el.addEventListener('ended', _events.onStop.bind(this), false);
        this.el.addEventListener('loadstart', _events.onStop.bind(this), false);
    }

    // Prototype
    AudioSprite.prototype = {

        /**
         * Load audio file
         * @return {this}
         */
        load: function() {
            this.el.load();
            return this;
        },

        /**
         * Get Sprite data
         * @param {string} id
         * @return {object}
         */
        get: function(id) {
            return this._data[id] ? this._data[id] : null;
        },

        /**
         * Play sprite
         * @param {string} id
         * @return {this}
         */
        play: function(id) {
            this.off('onloaded', this.play.bind(this, id));
            if (this._loaded) {

                // If no id is present, get current sprite.
                id || (id = this._current || 'meow2');

                var sprite = this.get(id);
                if (sprite) {
                    if (id !== this._current) {
                        this.el.currentTime = sprite.start;
                    }
                    this._end = sprite.start + sprite.length;
                    this._current = id;
                    this.el.play();
                }
            } else {
                this
                    .on('onloaded', this.play.bind(this, id))
                    .load()
                ;
            }
            return this;
        },

        /**
         * Stop audio
         * @return {this}
         */
        stop: function() {
            this.off('onloaded', this.play);
            if (this._loaded) {
                this.el.pause();
            }
            return this;
        }
    };

    // Add event methods
    for (var name in window.Events) {
        AudioSprite.prototype[name] = window.Events[name];
    }

    window.AudioSprite = AudioSprite;

}());