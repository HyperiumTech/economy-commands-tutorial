const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const express = require("express");
const http = require("http");
const app = express();
const cooldown = new Set()
const db = require('quick.db') // You Need to add this here in order for it to work!

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://your project name.glitch.me`);
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't Find Command!");
    return;
  }

  jsfile.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${f} Loaded`);
    client.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("ready", async () => {
  console.log(`Ready to go!`);
  client.user.setActivity("Made by hyperium tech");
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  const invite = message.guild.fetchVanityCode();
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let cmd;
  cmd = args.shift().toLowerCase();
  let command;
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);

  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
  } else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
  }
  try {
    command.run(client, message, args);
  } catch (e) {
    return;
  }
});

client.login(process.env.TOKEN);
