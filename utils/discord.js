/**
 * Gets a list of all active members and the voice channel they are active in
 * 
 * @param {Client} bot A discordjs Client
 * @returns {Array} Array of objects of member ids and the channel ids of
 * channels that they are in
 */
const getUsersList = bot => {
  const channels = bot.channels.cache;
  const memberList = [];
  for (const [ channelId, channel ] of channels) {
    if (channel.type !== 'voice') continue;
    // console.log(`${channel.name}::${channel.guild.name}`);
    const members = channel.members;
    for (const [ memberId, member ] of members) {
      // console.log(`\t- ${member.user.username}`);
      memberList.push({
        member: memberId,
        channel: channelId,
      });
    }
  }
  return memberList;
};

const playAudio = async (channel, audioStream) => {
  if (!channel) return;
  try {
    const connection = await channel.join();
    const dispatcher = connection.play(audioStream, {
      type: 'ogg/opus',
    });
    dispatcher.on('finish', () => {
      console.log('Finished playing!');
      channel.leave();
    });
    dispatcher.on('error', error => {
      channel.leave();
      throw(error);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsersList: getUsersList,
  playAudio: playAudio,
};