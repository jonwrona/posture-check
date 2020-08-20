const fs = require('fs');
const path = require('path');
const tts = require('../utils/textToSpeech');
const { playAudio, getUsersList } = require('../utils/discord');
const bot = require('../utils/bot');
const remindersList = require('../data/reminders');
const randomReminder = () => remindersList[Math.floor(Math.random() * remindersList.length)];

module.exports = {
  cron: '*/20 * * * *', // every 20 minutes
  action: async () => {
    // const result = await tts(randomReminder());
    const audioStream = fs.createReadStream(path.join(__dirname, '../OUTPUT.ogg'));
    const usersList = getUsersList(bot);
    const channelIdList = _.uniq(usersList.map(o => o.channel));
    channelIdList.forEach(channelId => {
      const channel = bot.channels.cache.get(channelId);
      playAudio(channel, audioStream);
    });
  },
}