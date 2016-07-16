let $ = require('jquery');
let ui = require('./components/ui.es6');

$(function () {
    ui('#search-form', '#pokemon', '#results', '#result-image', '#question');
});
