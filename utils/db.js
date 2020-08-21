const Member = require('../db/models/Member');
const Reminder = require('../db/models/Reminder');

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
};

const incrementThanks = async (memberId) => {
  const now = new Date();

  const member = await Member.findOne({
    where: {
      subscribed: true,
      memberId: memberId,
    },
  });

  if (!member) {
    return { status: 1 };
  }

  const lastThank = member.thankedAt ? new Date(member.thankedAt) : false;
  if ((new Date(now - lastThank)).getMinutes() <= 1) {
    return { status: 2 };
  }

  const lastReminder = await getReminderTimestamp();
  if ((new Date(now - lastReminder)).getMinutes() >= 1) {
    return { status: 3 };
  }

  member.thanks = member.thanks + 1;
  member.thankedAt = now;
  member.save();
  return {
    status: 0, //success
    count: member.thanks,
  };
};

const setReminderTimestamp = async () => {
  const [ reminder, created ] = await Reminder.findOrCreate({
    where: { id: process.env.REMINDER_ID },
  });
  if (reminder) {
    reminder.remindedAt = new Date();
    reminder.save();
  }
}

const getReminderTimestamp = async () => {
  const reminder = await Reminder.findOne({
    where: { id: process.env.REMINDER_ID },
  });
  return reminder ? reminder.remindedAt : null;
};

module.exports = {
  getSubscribers: getSubscribers,
  getSubscriberIds: getSubscriberIds,
  incrementThanks: incrementThanks,
  setReminderTimestamp: setReminderTimestamp,
  getReminderTimestamp: getReminderTimestamp,
};