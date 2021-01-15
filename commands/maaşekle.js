const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("!")) return;
  if(message.author.id != "608417301317812260" && "420242141583769600") return message.reply("Sadece kurucular para ekleyebilir.");

  let rol = message.mentions.roles.first();
  if (isNaN(args[1])) return;
  message.guild.members.cache.forEach(user => {
    if (user.roles.cache.has(rol.id)) {
      db.add(`money_${message.guild.id}_${user.id}`, args[1]);
    }
  });
let size = message.guild.members.cache.filter(x => x.roles.cache.has(rol.id)).size

  message.channel.send(`Toplamda ${size} üyenin maaşı kasalarına dağıtıldı.`);
};

module.exports.help = {
  name: "maaşyatır",
  aliases: ["my"]
};