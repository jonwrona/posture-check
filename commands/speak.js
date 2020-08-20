const tts = require('../utils/textToSpeech');
const fs = require('fs');
const path = require('path')
const { playAudio } = require('../utils/discord');

module.exports = {
  name: 'speak',
  description: 'Speak in the callers channel!',
  async execute(msg, args) {
    const message = args.join(' ').trim();
    if (!message.length) return;
    if (!msg.guild) return;
    const channel = msg.member.voice.channel;
    if (channel) {
      await tts(message);
      const audioStream = fs.createReadStream(path.join(__dirname, '../OUTPUT.ogg'));
      playAudio(channel, audioStream);
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }
}