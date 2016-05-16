jQuery(document).ready(function($) {

    var $button = $('.button.play');
    var $progress = $('.progress');

    var $handle = $('.handle');
    var $bar = $('.bar');
    var $buffer = $('.buffer');
    var $sprite = $('.sprite');

    //code
    var audio = document.getElementById('audio');

    var spriteData = {
        meow1: {
            start: 0,
            length: 1.1
        },
        meow2: {
            start: 1.3,
            length: 1.1
        },
        whine: {
            start: 2.7,
            length: .8
        },
        purr: {
            start: 5,
            length: 5
        }
    };

    var spriteObject = new AudioSprite(audio, spriteData);

    spriteObject
        .on('meow2:complete', function() {
            this.play('purr');
        })
        .on('purr:complete', function() {
            this.play('meow1');
        })
        .on('meow1:complete', function() {
            this.play('whine');
        })
        .on('whine:complete', function() {
            this.play('meow2');
        })
    ;
    //code

    spriteObject
        .on('progress', function(time) {
            // round time!
            var currentTime = ~~(time * 100) / 100;
            var percent = ~~((time / this.el.duration) * 100);

            $progress.text(currentTime);
            $bar.css('width', percent + '%');
            $handle.css('left', percent + '%');
        })
        .on('play', function() {
            $button.text('Pause');
            if (this._current) {
                $sprite.text('Sprite ID: ' + this._current);
            }
        })
        .on('stop', function() {
            $button.text('Play');
        })
        .on('onload', function(percent) {
            $progress.text('Loading: ' + percent + '%');
            $buffer.css('width', percent + '%');
        })
        .on('onloaded', function() {
            $progress.text('Loaded: 100%');
        })
        .on('loadstart', function() {
            $progress.text('Initializing');
        })
    ;

    $button.on('click', function(e) {
        e.preventDefault();
        if (audio.ended || audio.paused) {
            spriteObject.play();
        } else {
            spriteObject.stop();
        }
    });

    $('.code.html').text($('<div></div>').append($(audio).clone()).html());

    $.ajax({
        url: 'assets/js/main.js',
        dataType: 'html',
        success: function(code) {
            var codeA = code.split('//code')[1];
            $('.code.js').text(codeA);
        },
        error: function() {
        }
    });

    $button
        .on('touchstart', function () {
            $(this).addClass('active');
        })
        .on('touchend touchcancel touchmove', function() {
            $(this).removeClass('active');
        })
    ;
});