const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

exports.run = async (client, message, args, config) => {

    let timeout = 300000 // 24 hours in milliseconds, change if you'd like.
    let maximumamount = "100"
    // random amount: Math.floor(Math.random() * 1000) + 1;

    let random = Math.floor(Math.random() * maximumamount+maximumamount)
    
    let work = await db.fetch(`work_${message.author.id}`);

    if (work !== null && timeout - (Date.now() - work) > 0) {
        let time = ms(timeout - (Date.now() - work));

        message.channel.send(`you are tired take rest for **${time.minutes}m ${time.seconds}s**`)
    } else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Work`, message.author.displayAvatarURL)
    .setColor("GREEN")
    .setDescription(`**you worked and got ${random}$**`)
    message.channel.send(embed)
    db.add(`money_${message.author.id}`, random)
    db.set(`work_${message.author.id}`, Date.now())
        
    }

} 

module.exports.help = {
  name : "work",
  aliases : ["work "]
}
