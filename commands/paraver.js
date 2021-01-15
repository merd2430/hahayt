const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  
  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  if (!user) {
      return message.channel.send("Birini etiketlemelisiniz.")
  }
  
  if (!args[1]) {
      return message.channel.send("Bir miktar belirtmelisiniz.")
  }
  
  if (message.content.includes('-')) { 
      return message.channel.send("Eksi para yollayamazsın.")
    
  }
  if(isNaN(args[1])) return message.channel.send("Sadece sayı girebilirsin.")
  if(user.id === message.author.id) return message.channel.send("BRUH")
  if (member < args[1]) {
      return message.channel.send("Kasanızda yeterli galleon yok.")
  }
db.add(`money_${message.guild.id}_${user.id}`, args[1])
db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

  message.channel.send(`${user} kullanıcısına **${args[1]}** Galleon gönderdin. Yeni bakiyesi **${bal}** Galleon. `)


}

module.exports.help = {
  name:"paraver",
  aliases: ["pv"]
}