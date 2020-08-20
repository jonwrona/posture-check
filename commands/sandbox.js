module.exports = {
  name: 'sandbox',
  description: 'Just a spot where I can test some stuff without creating new commands.',
  execute(msg, args) {
    console.log(msg.member.id);
    console.log(msg.member.voice.channel.members);
  }
}