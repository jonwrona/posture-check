const schedule = require('node-schedule');
const fs = require('fs');

const setupEvent = eventFile => {
  console.log(`Setting up ${eventFile} event`);
  const { cron, action } = require(eventFile);
  const job = schedule.scheduleJob(cron, () => {
    console.log(`Running the ${eventFile} action`);
    action();
  });
};

module.exports = () => {
  const events = fs.readdirSync(__dirname).filter(f => f !== 'index.js');
  events.forEach(event => setupEvent(`./${event}`));
};