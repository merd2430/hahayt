const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith('!'))return;  
  let tag = message.mentions.members.first() || message.author;
      var bangif = [
        "https://media.discordapp.net/attachments/636060904697495552/714221262796357662/tumblr_inline_o1akgcv02V1qdhe5m_500-1.gif",
   

    ];
let random = bangif[Math.floor(Math.random() * bangif.length)]
      const attach = new Discord.MessageAttachment(`${random}`);

  let bal = db.fetch(`money_${message.guild.id}_${tag.id}`)
   let mesaj;
    if (bal === null) bal = 0;
   if(args[0]) mesaj = `${tag} kullanıcısının kasasında **${bal}** Galleon bulunuyor.`
   else mesaj = `${tag}, Gringotts kasanda **${bal}** Galleon bulunuyor. `
   
 
    message.channel.send(mesaj);
 
 
  if (bal >= 3000) message.channel.send(attach)
};

module.exports.help = {
  name:"bakiye",
  aliases: ["b"]
}