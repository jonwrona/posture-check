const db = require('..');
const { DataTypes } = require('sequelize');

const Member = db.define('Member', {
  memberId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {});

Member.sync({ force: process.env.NODE_ENV !== 'production' });

module.exports = Member;