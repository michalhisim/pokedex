let config = require('./config.es6');
let createOptions = require('./nuanceOptions.es6');

require('./nuance.es6');

let tts = function (text) {

    let options = createOptions({
        language: config.TTS_LANGUAGE,
        voice: config.TTS_VOICE,
        text: text
    });

    Nuance.playTTS(options);
};

module.exports = tts;
