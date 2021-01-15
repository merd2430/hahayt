const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  if (!message.content.startsWith("!")) return;
   if (!message.member.roles.cache.some(i=> i.id === '713706304799244408'))
   if(message.author.id != "719053038077083738" && "420242141583769600") return message.reply("Sadece kurucular para ekleyebilir.");
  let user = message.mentions.members.first() || message.author;
  if (isNaN(args[1])) return;
  db.add(`money_${message.guild.id}_${user.id}`, args[1]);
  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

  let moneyEmbed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(
      `Başarıyla **${args[1]}$** eklendi.\n\nYeni bakiyesi **${bal}$**`
    );
  message.channel.send(`${user} kullanıcısının kasasına **${args[1]}** Galleon eklendi. Yeni bakiyesi **${bal}** Galleon.`);
};

module.exports.help = {
  name: "paraekle",
  aliases: ["pe"]
};