const fs = require('fs');
const { Response } = require('node-fetch');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const tts = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.TTS_API_KEY,
  }),
  url: process.env.TTS_URL,
});

module.exports = async text => {

  if (!text) text = 'Check your posture!';
  console.log(`Speaking: "${text}"`);

  const params = {
    text: text,
    accept: 'audio/ogg;codecs=opus',
    voice: 'en-US_KevinV3Voice',
  };

  try {
    const { result } = await tts.synthesize(params);
    result.pipe(fs.createWriteStream('OUTPUT.ogg'));
    return;
  } catch (err) {
    console.log (err);
  }

};