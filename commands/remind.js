const { runEvent } = require('../events');

module.exports = {
  name: 'remind',
  description: 'Run the reminder event despite the schedule.',
  execute(msg, args) {
    runEvent('reminder');
  },
}