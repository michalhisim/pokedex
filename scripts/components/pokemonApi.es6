let $ = require('jquery');

let url = 'http://pokeapi.co/api/v2/';

/**
 * @param {string} name
 * @param {function} callback
 * @param {function} error
 */
let getPokemon = function (name, callback, error) {
    let query = $.ajax(`${url}pokemon/${name}/`);

    if (callback) {
        query.done(callback);
    }

    if (error) {
        query.fail(error);
    }
};

module.exports.getPokemon = getPokemon;
