const { incrementThanks } = require('../utils/db');

module.exports = {
  name: 'thanks',
  description: 'Say thank you to posture bot for helping.',
  async execute(msg, args) {
    const response = await incrementThanks(msg.member.id);
    if (response.status === 0) {
      // success
      const c = response.count;
      msg.reply(`You're welcome! I've helped you fix your back ${c} time${c > 1 && 's'}!`);
    } else if (response.status === 1) {
      // member not subscribed
      msg.reply(`I won't accept your thanks unless you're subscribed. \`!posture subscribe\``)
    } else if (response.status === 2) {
      // thanked too recently
      msg.reply(`Calm down I get it dude!`);
    } else if (response.status === 3) {
      // can't thank if bot didn't remind recently
      msg.reply(`You're welcome I guess...`);
    }
  },
};