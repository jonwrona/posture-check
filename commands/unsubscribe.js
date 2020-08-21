const Member = require('../db/models/Member');

module.exports = {
  name: 'unsubscribe',
  description: 'Removes a subscription for a user to the posture bot.',
  async execute(msg, args) {

    const memberId = msg.member.id;

    const [ member, created ] = await Member.findOrCreate({
      where: {
        memberId: memberId,
      },
      defaults: {
        subscribed: false,
      },
    });
    
    if (!!member.subscribed) {
      member.subscribed = false;
      member.save();
      console.log(`Member with id ${memberId} subscription removed`);
    } else {
      console.log(`Member with id ${memberId} is not subscribed`);
    }
    msg.react('😦');
  }
}