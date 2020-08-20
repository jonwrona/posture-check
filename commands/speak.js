const tts = require('../utils/textToSpeech');
const fs = require('fs');
const path = require('path')
const ArgumentParser = require('argparse');
const { playAudio } = require('../utils/discord');

const reminders = require('../data/reminders');
const randomReminder = () => reminders[Math.floor(Math.random() * reminders.length)];

module.exports = {
  name: 'speak',
  description: 'Speak in the callers channel!',
  async execute(msg, args) {

    if (!msg.guild) return;
    const channel = msg.member.voice.channel;
    if (channel) {
      const reminder = randomReminder();
      const result = await tts(reminder);
      const audioStream = fs.createReadStream(path.join(__dirname, '../OUTPUT.ogg'));
      playAudio(channel, audioStream);
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }
}