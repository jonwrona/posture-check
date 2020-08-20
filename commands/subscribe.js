const Member = require('../db/models/Member');

module.exports = {
  name: 'subscribe',
  description: 'Subscribes a user to the posture bot.',
  async execute(msg, args) {

    const memberId = msg.member.id;

    const [ member, created ] = await Member.findOrCreate({
      where: {
        memberId: memberId,
      },
      defaults: {
        subscribed: true,
      },
    });
    
    if (!member.subscribed) {
      member.subscribed = true;
      member.save();
    }

    console.log(`Member with id ${memberId} was subscribed to posture bot.`);
  }
}