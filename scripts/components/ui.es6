let $ = require('jquery');
let pokemonApi = require('./pokemonApi.es6');
let tts = require('./tts.es6');
let recognition = require('./recognition.es6');
let capitalization = require('./capitalization.es6');

/**
 * @param {string} formSelector
 * @param {string} inputSelector
 * @param {string} resultSelector
 * @param {string} resultImageSelector
 * @param {string} questionSelector
 */
let ui = function (formSelector, inputSelector, resultSelector, resultImageSelector, questionSelector) {
    let formElement = $(formSelector);
    let inputElement = $(inputSelector);
    let resultElement = $(resultSelector);
    let resultImageElement = $(resultImageSelector);
    let questionElement = $(questionSelector);

    let askedPokemon = null;
    let askedPokemonName = null;
    let askedProperty = null;

    formElement.submit(function (event) {
        event.preventDefault();

        let name = inputElement.val();

        let callback = function (data) {
            let result = '';

            if (askedProperty.value != 'abilities') {
                let property = data[askedProperty.value] * askedProperty.multiplayer;
                result = `${askedProperty.value} of pokemon ${askedPokemonName} is ${property} ${askedProperty.units}.`;
            } else {
                result = `${askedPokemonName}'s abilities `;

                if (data.abilities.length > 1) {
                    result += 'are ';
                } else {
                    result += 'is ';
                }

                for (let item of data.abilities) {
                    result += item.ability.name + ' and ';
                }

                result = result.substring(0, result.length - 5);

                result += '.';
            }

            resultElement.text(capitalization(result));

            resultImageElement.attr('src', data.sprites.front_default);
            tts(result);

            askedPokemon = null;
            askedPokemonName = null;
            askedProperty = null;
        };

        let error = function () {

        };

        pokemonApi.getPokemon(name, callback, error);
    });

    // UserMedia

    let userMedia = undefined;

    navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;


    if (!navigator.getUserMedia) {
        console.error("No getUserMedia Support in this Browser");
    }

    let success = function (msg) {
        if (msg.result_type == "NDSP_ASR_APP_CMD") {
            if (msg.result_format == "nlu_interpretation_results") {
                try {

                    let data = msg.nlu_interpretation_results.payload.interpretations[0].concepts;

                    askedPokemon = data['POKEMON'][0].value;
                    askedPokemonName = data['POKEMON'][0].literal;

                    if (typeof data['PROPERTY'][0].value == 'object') {
                        askedProperty = data['PROPERTY'][0].value;
                    }

                    let sentence = String(msg.nlu_interpretation_results.payload.interpretations[0].literal).toLowerCase();

                    questionElement.text(capitalization(sentence + '?'));
                    inputElement.attr('value', askedPokemon);
                    formElement.trigger('submit');
                } catch (ex) {
                    console.log(JSON.stringify(msg, null, 2));
                }
            } else {
                questionElement.text('Sorry I did not understand. Say it again please.');
            }
        } else if (msg.result_type === "NDSP_APP_CMD") {
            if (msg.result_format == "nlu_interpretation_results") {
                try {
                    console.log(JSON.stringify(msg.nlu_interpretation_results.payload.interpretations, null, 2));
                } catch (ex) {
                    console.log(JSON.stringify(msg, null, 2));
                }
            } else {
                console.log(JSON.stringify(msg, null, 2));
            }
        }
    };

    navigator.getUserMedia({
        audio: true
    }, function (stream) {
        userMedia = stream;

        recognition(userMedia, success, questionElement);
    }, function (error) {
        console.error("Could not get User Media: " + error);
    });

};

module.exports = ui;
