const Member = require('../db/models/Member');

const getSubscribers = async () => {
  const members = await Member.findAll({
    where: {
      subscribed: true,
    },
  });
  return members;
};

const getSubscriberIds = async () => {
  const members = await getSubscribers();
  return members.map(member => member.memberId);
}

module.exports = {
  getSubscribers: getSubscribers,
  getSubscriberIds: getSubscriberIds,
};