let $ = require('jquery');
let config = require('./config.es6');
let createOptions = require('./nuanceOptions.es6');

window.Resampler = require('./resampler.es6');
require('./nuance.es6');

/**
 * @param {object} userMedia
 * @param {function} callback
 * @param {object} questionElement
 */
let recognizer = function (userMedia, callback, questionElement) {
    let buttonElement = $('#ask-pokedex');
    let signalStatusElement = $('#signal-status');

    buttonElement.on('mousedown', function () {
        var options = createOptions({
            userMedia: userMedia,
            //language: $language.val()
        });

        options.nlu = true;
        options.tag = config.NLU_TAG;

        if (typeof callback == 'function') {

            options.onresult = callback;
        }

        options.onvolume = function (amplitudeArray) {

            let min = 999999;
            let max = 0;
            for (var i = 0; i < amplitudeArray.length; i++) {
                var val = amplitudeArray[i];
                if (val > max) {
                    max = val;
                } else if (val < min) {
                    min = val;
                }
            }

            let value = (max - min);

            if (value > 60) {
                value = 60;
            }

            let move = (60 - value) / 2;

            value += 'px';
            move += 'px';

            signalStatusElement.css({
                height: value,
                width: value,
                top: move,
                left: move,
            });
        };

        Nuance.startASR(options);

        $(this).text('Just say some question...').addClass('btn--pressed');
        questionElement.text('');
    });

    buttonElement.on('mouseup', function () {
        Nuance.stopASR();
        $(this).text('Press and hold to ask Pokedex!').removeClass('btn--pressed');

        signalStatusElement.css('height', 4);
        signalStatusElement.css('width', 4);
        signalStatusElement.css('top', 28);
        signalStatusElement.css('left', 28);
    });

};

module.exports = recognizer;