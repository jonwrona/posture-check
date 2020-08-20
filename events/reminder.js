const fs = require('fs');
const path = require('path');
const { uniq } = require('lodash');
const tts = require('../utils/textToSpeech');
const { playAudio, getUsersList } = require('../utils/discord');
const bot = require('../utils/bot');
const remindersList = require('../data/reminders');
const { getSubscriberIds } = require('../utils/db');
const randomReminder = () => remindersList[Math.floor(Math.random() * remindersList.length)];

const FILEPATH = path.join(__dirname, '../OUTPUT.ogg');

module.exports = {
  // cron: '*/30 * * * * *', // every 30 seconds
  cron: '*/15 * * * *', // every 15 minutes
  action: async () => {
    try {
      fs.statSync(FILEPATH);
    } catch (error) {
      await tts(randomReminder());
    }
    const subscriberIds = await getSubscriberIds();
    const audioStream = fs.createReadStream(FILEPATH);
    const usersList = getUsersList(bot).filter(user => subscriberIds.includes(user.member));
    const channelIdList = uniq(usersList.map(user => user.channel));
    console.log(`Posture checking ${channelIdList.length} channels!`);
    channelIdList.forEach(channelId => {
      const channel = bot.channels.cache.get(channelId);
      playAudio(channel, audioStream);
    });
  },
}