const tts = require('../utils/textToSpeech');
const fs = require('fs');
const path = require('path')

module.exports = {
  name: 'speak',
  description: 'Speak in the callers channel!',
  async execute(msg, args) {
    const text = args.join(' ');

    if (!msg.guild) return;
    if (msg.member.voice.channel) {
      await tts(text);
      try {
        const connection = await msg.member.voice.channel.join();
        const audioStream = fs.createReadStream(path.join(__dirname, '../OUTPUT.ogg'));
        const dispatcher = connection.play(audioStream, {
          type: 'ogg/opus',
        });
        dispatcher.on('finish', () => {
          console.log('Finished playing!');
          msg.member.voice.channel.leave();
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }
}