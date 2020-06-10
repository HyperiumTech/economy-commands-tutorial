module.exports.run = async (client, message, args, config) => {
    message.channel.send("pong")
} 

module.exports.help = {
  name : "ping",
  aliases : ["ping"]
}
