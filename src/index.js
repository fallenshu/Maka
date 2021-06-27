require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { m } = require("./config.json");
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



client.on('guildMemberAdd', async (member) => {

 const mutedUser = require('./models/userMuted')
const muteinfo = require('./models/mute')

const welcomeSchema = require("./models/welcome");

const data = await welcomeSchema.findOne({
  GuildID: member.guild.id,
});

if (data) {
  const channel = member.guild.channels.cache.get(data.ChannelID);

  function format(msg) {
    let text = msg;

    const terms = [
      { name: "{user}", value: `<@${member.id}>` },
      { name: "{server}", value: `${member.guild.name}` },
      { name: "{membercount}", value: `${member.guild.memberCount}` },
    ];

    for (let { name, value } of terms)
      text = text.replace(new RegExp(name, "igm"), value);

    return text;
  }

  const finalmsg = format(data.Txt);
  channel.send(finalmsg);

} else if (!data) {
  console.log(`Server did not have welcome message setup`)
}

/* const mData = await mutedUser.findOne({
  UserID: member.id
})

const mmData = await mutedinfo.findOne({
  GuildID: member.guild.id
})

if(mData) {
  setTimeout(() => {
    try {
      member.roles.add(mmData.MutedRole)
      member.roles.remove(mmData.NormalRole)
      } catch (err) {
        return;
      }
  }, 3000);
  
} else if(!mData) {
return; 
}
*/
})

client.on("guildMemberRemove", async (member) => {

  const leaveSchema = require("./models/leave");

  const data = await leaveSchema.findOne({
    GuildID: member.guild.id,
  });

  if (data) {
    const channel = member.guild.channels.cache.get(data.ChannelID);

    function format(msg) {
      let text = msg;

      const terms = [
        { name: "{user}", value: `${member.user.tag}` },
        { name: "{server}", value: `${member.guild.name}` },
        { name: "{membercount}", value: `${member.guild.memberCount}` },
      ];

      for (let { name, value } of terms)
        text = text.replace(new RegExp(name, "igm"), value);

      return text;
    }

    const finalmsg = format(data.Txt);
    channel.send(finalmsg);
  } else if (!data) {
    console.log(`Server did not have leave message setup`);
  }

 
});


client.login(process.env.TOKEN);
