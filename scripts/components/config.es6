// Credentials

const URL = 'wss://ws.dev.nuance.com/?';

// const APP_ID = "NMDPTRIAL_michal_simon_centrum_cz20160715220757";
const APP_ID = "NMDPPRODUCTION_Michal_Simon_pokedex_20160715223601";
//const APP_KEY = "f6e2d1c9f187378e22c88a96a878d83dc74fd655851f6320cdfe72e6c68616bd69e8865a6fbde9918573272eec006bb34f4109d5606cf52d6a681331ee2aee57";
const APP_KEY = "b2c39f86232cac56068529a51b733fc53dd9ed33a6100ea06f2e37fbe461cc96246c1d4798c99d9e4ec6436939822f765c1ca9022cb7a39be6da97ca3b63615f";
const USER_ID = "";
const NLU_TAG = "V5";

// ASR
// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
const ASR_LANGUAGE = "eng-USA";

// TTS
// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
const TTS_LANGUAGE = "eng-USA";
const TTS_VOICE = "";

module.exports = {
    URL: URL,
    APP_ID: APP_ID,
    APP_KEY: APP_KEY,
    USER_ID: USER_ID,
    NLU_TAG: NLU_TAG,
    ASR_LANGUAGE: ASR_LANGUAGE,
    TTS_LANGUAGE: TTS_LANGUAGE,
    TTS_VOICE: TTS_VOICE,
};
