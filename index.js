const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Discord.Client();
const bot = new Discord.Client({ disableEveryone: false });
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Bağlanıldı!");
  response.sendStatus(200);
});
app.listen(19234);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 120000)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

//////////READY KISMI BURADADIR////////////
bot.on("guildMemberAdd", async member => {
   db.add(`money_${member.guild.id}_${member.id}`, 1000);
  });
bot.on("guildMemberRemove", async member => {
   db.subtract(`money_${member.guild.id}_${member.id}`, 1000);
  });


  bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
      commandfile = bot.commands.get(bot.aliases.get(cmd));
    }

    if (!message.content.startsWith(prefix)) return;

    try {
      commandfile.run(bot, message, args);
    } catch (e) {}
  });

  bot.on("ready", async()=>{
  console.log("Bot aktif")
  })

bot.login(""); //AHA DA BURAYA BOT TOKEN YAZACAKSUNUZ
