const Discord = require("discord.js");
const prefixSchema = require("../models/prefix");
const afk = require('../models/afk')
const m = "2f3136";
const suggestionsSchema = require("../models/suggestions");

module.exports = {
  name: "message",
  async execute(message, client) {
        
    const d = await prefixSchema.findOne({
      GuildID: message.guild.id,
    });

    const prefix = d.Prefix;


    if (message.channel.type === "dm") {
      console.log("Inside DM event.");
      client.emit("directMessage", message);
      return;
    }

    /*- - - - - - - Suggestions - - - - - - -*/

    
        const suggestionData = await suggestionsSchema.findOne({
          GuildID: message.guild.id,
        });

        if(suggestionData)  {
    const{ guild, channel, content, member } = message
    const cachedChannelID = message.guild.channels.cache.get(suggestionData.ChannelID);
     if (message.author.bot) return;
      if(message.channel.id === cachedChannelID.id) {

        const embed = new Discord.MessageEmbed()
        .setColor(m)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(content)
        .setTimestamp()

        message.delete({ timeout: 100 })
        .catch(err => {
          return;
        })

        channel.send(embed)
        .then((msg) => {
          msg.react(`✅`);
          msg.react(`⛔`);
        })
      }
    } else if(!suggestionData) {
    }
    /*- - - - - - - Suggestions - - - - - - -*/


    /*- - - - - - - AFK STUFF - - - - - - -*/
    const mentioned = message.mentions.members.first();
    if (mentioned) {
      const data = await afk.findOne({
        UserID: mentioned.id,
      });

      if (data) {
        message.channel.send(
          `**${mentioned.user.username}** is currently AFK. Reason: **${data.Reason}**`
        );
      }
    }

    const mainData = await afk.findOne({
      UserID: message.author.id,
    });

    if (mainData) {
      message.channel.send(
        `**Welcome back!** I removed your AFK **${message.author.username}**.`
      );
      mainData.deleteOne({
        UserID: message.author.id,
      });
      message.member.setNickname(null);
    }
    /*- - - - - - - AFK STUFF - - - - - - -*/



    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime =
        timestamps.get(message.author.id) + cooldownAmmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const smOncmds = new Discord.MessageEmbed()
          .setAuthor(`Cooldown!`)
          .setDescription(
            `Please wait \`${timeLeft.toFixed(
              1
            )}\` more second(s) before reusing that command`
          )
          .setColor(m);

        return message.channel.send(smOncmds);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmmount);

    if (command.ownerOnly) {
      if (message.author.id == "462936117596127232") {
      } else {
        const ownerOnly = new Discord.MessageEmbed()
          .setAuthor(`Owner Only Command!`)
          .setDescription(`This command is a owner only command!`)
          .setColor(m);

        return message.channel.send(ownerOnly);
      }
    }

    if (command.disabled) {
      if (message.author.id == "462936117596127232") {
      } else {
        return message.channel.send(
          `**${
            message.author.username
          }**, This command has been disabled by the developer • **Reason:** ${
            command.reason != undefined ? command.reason : "No reason provided"
          }`
        );
      }
    }
    const p = d.Prefix;

    try {
      client.commands.get(command.name).execute(message, client, args, p, m);
    } catch (err) {
      console.log(err);

      const failed = new Discord.MessageEmbed()
        .setAuthor(`Error Occured!`)
        .setDescription(`There was an error with running that command!`)
        .setColor(m);

      return message.channel.send(failed);
    }
  },
};


