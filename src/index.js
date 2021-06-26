require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");
const {  m } = require("./config.json");
const mongoose = require('mongoose')
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);

    client.commands.set(command.name, command);
  }
}

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch(err => {
    console.log(err);
  });



client.login(process.env.TOKEN);
