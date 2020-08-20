const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const tts = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.TTS_API_KEY,
  }),
  url: process.env.TTS_URL,
});

module.exports = async (text='Posture check!') => {

  console.log(`Speaking: "${text}"`);

  const params = {
    text: text,
    accept: 'audio/ogg;codecs=opus',
    voice: 'en-GB_JamesV3Voice',
  };

  try {
    const { result } = await tts.synthesize(params);
    await result.pipe(fs.createWriteStream('OUTPUT.ogg'));
    return result;
  } catch (err) {
    console.log (err);
  }

};