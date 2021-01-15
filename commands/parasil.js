const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  
  
  let ownerID = '719053038077083738'

   if (!message.member.roles.cache.some(i=> i.id === '711534208417267733'))
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

  
    message.channel.send(`${user} kullanıcısının kasasından **${args[1]}** Galleon silindi. Yeni bakiyesi **${bal}** Galleon.`)

};


module.exports.help = {
  name:"parasil",
  aliases: ["ps"]
}