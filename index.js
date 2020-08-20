require('dotenv').config();
const _ = require('lodash');
const setupEvents = require('./events');
const bot = require('./utils/bot');
const Discord = require('discord.js');


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  setupEvents();
});

bot.commands = new Discord.Collection();
const commands = require('./commands');
Object.values(commands).forEach(command => {
  bot.commands.set(command.name, command);
});

const commandPrefix = process.env.COMMAND_PREFIX || '!posture';

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const prefix = args.shift().toLowerCase();
  if (prefix !== commandPrefix) return;

  const command = args.shift().toLowerCase();
  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.log(error);
    msg.reply('There was an error trying to execute that command!');
  }

});