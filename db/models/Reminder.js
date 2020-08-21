const db = require('..');
const { DataTypes } = require('sequelize');

const Reminder = db.define('Reminder', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  remindedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {});

Reminder.sync({ force: true });

module.exports = Reminder;