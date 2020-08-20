require('dotenv').config();
const express = require('express');
const { setupEvents } = require('./events');
const bot = require('./utils/bot');
const Discord = require('discord.js');
require('./db'); // call this to perform first time db connection


const PORT = process.env.PORT || 5000;
const app = express();
app.listen(PORT, () => console.log(`Started webserver on port ${PORT}`));

app.get('/', (req, res) => res.send('Check yo posture!'));

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