const Member = require('../db/models/Member');

module.exports = {
  name: 'sandbox',
  description: 'Just a spot where I can test some stuff without creating new commands.',
  async execute(msg, args) {
    const members = await Member.findAll();
    members.forEach(m => {
      console.log(`${m.memberId}\t${m.subscribed}`);
    });
  }
}