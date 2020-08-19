require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.commands = new Discord.Collection();
const commands = require('./commands');
Object.values(commands).forEach(command => {
  bot.commands.set(command.name, command);
})

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  let command = args.shift().toLowerCase();

  if (command.charAt(0) !== '\\') return;
  command = command.substring(1);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.log(error);
    msg.reply('There was an error trying to execute that command!');
  }

});