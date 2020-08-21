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
    const guildId = channel.guild.id;
    // console.log(`${channel.name}::${channel.guild.name}`);
    const members = channel.members;
    for (const [ memberId, member ] of members) {
      // console.log(`\t- ${member.user.username}`);
      memberList.push({
        member: memberId,
        channel: channelId,
        guild: guildId,
      });
    }
  }
  return memberList;
};

const playAudio = async (bot, channels, audioStream) => {

  // organize the channels into guilds
  const guildMap = {};
  let length = 0;
  channels.forEach(channel => {
    const guildId = channel.guild.id;
    if (!!guildMap[guildId]) {
      guildMap[guildId].push(channel);
    } else {
      guildMap[guildId] = [ channel ];
    }
    length = Math.max(guildMap[guildId], length);
  });

  const guildArray = Object.values(guildMap);
  for (let i = 0; i < length; i++) {
    const channels = guildArray.map(guild => guild[i] || null).filter(el => el != null);
    console.log(channels);
  }

  try {
    const broadcast = bot.voice.createBroadcast();
    for (const channel of channels) {
      const connection = await channel.join();
      connection.play(broadcast);
    }
    const broadcastDispatcher = broadcast.play(audioStream, { type: 'ogg/opus' });
    const leaveChannels = () => channels.forEach(channel => channel.leave());
    broadcastDispatcher.on('finish', () => {
      console.log('Finished playing!');
      broadcast.end();
      leaveChannels();
    });
    broadcastDispatcher.on('error', error => {
      broadcast.end();
      leaveChannels();
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