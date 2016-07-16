let config = require('./config.es6');

// Default options for all transactions

let defaultOptions = {
    onopen: function () {
        console.log("Websocket Opened");
    },
    onclose: function () {
        console.log("Websocket Closed");
    },
    onresult: function (msg) {
        if (msg.result_type == "NMDP_TTS_CMD") {
            console.log(JSON.stringify(msg, null, 2));
        } else if (msg.result_type == "NVC_ASR_CMD") {
            console.log(JSON.stringify(msg, null, 2));
        } else if (msg.result_type == "NDSP_ASR_APP_CMD") {
            if (msg.result_format == "nlu_interpretation_results") {
                try {
                    console.log(JSON.stringify(msg.nlu_interpretation_results.payload.interpretations, null, 2));
                } catch (ex) {
                    console.log(JSON.stringify(msg, null, 2));
                }
            } else {
                console.log(JSON.stringify(msg, null, 2));
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
    },
    onerror: function (error) {
        console.error(error);
        //$content.removeClass('connected');
    }
};

let createOptions = function (overrides) {
    let options = Object.assign(overrides, defaultOptions);

    options.appId = config.APP_ID;
    options.appKey = config.APP_KEY;
    options.userId = config.USER_ID;
    options.url = config.URL;

    return options;
};

module.exports = createOptions;