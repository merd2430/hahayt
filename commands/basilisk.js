const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;
    let user = message.author;
    var bangif = [
        "https://media.giphy.com/media/6CovzgyTig7M4/giphy.gif",
      

    ];
let random = bangif[Math.floor(Math.random() * bangif.length)]
      const attach = new Discord.MessageAttachment(`${random}`);

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

  
  if (author < 5000) return message.channel.send(`${user}, satın almak için yeterli paran bulunmamakta.`)
  if(message.member.roles.cache.some(i=> i.id === '714079904647479337')) return message.channel.send(`${user}, zaten bu asaya sahipsin.`)
        
        db.fetch(`asa_${message.guild.id}_${user.id}`);
        db.add(`asa_${message.guild.id}_${user.id}`, 1)

        

        db.subtract(`money_${message.guild.id}_${user.id}`, 5000)
        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        message.member.roles.add('714079904647479337')
        message.channel.send(`${user}, başarıyla **5.000** Galleon ödeyerek **Basilisk Boynuzu** özlü asa satın aldın! Yeni bakiyen **${bal}** Galleon.`)
        message.channel.send(attach)


  }

module.exports.help = {
  name:"basilisk",
  aliases: []
}