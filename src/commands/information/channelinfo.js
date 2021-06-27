const Discord = require('discord.js')
const main = "E6E6FA"

module.exports = {
  name: "channelinfo",
  aliases: ["ci"],
  desc: "Display information about the current channel.",
  usage: "channelinfo <#channel> ",
  category: "Information",
  async execute(message, client, args, p, m) {
    const channel = message.mentions.channels.first() || message.channel;
    const { name, id, rawPosition, topic, nsfw, type } = channel;
    const { guild } = message;
    const icon = guild.iconURL();
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Channel Information`, icon)
      .setColor(m)
      .addFields(
        {
          name: `Name`,
          value: "```" + name + "```",
          inline: true,
        },
        {
          name: `ID`,
          value: "```" + id + "```",
          inline: true,
        },
        {
          name: "Type",
          value: "```" + type + "```",
          inline: true,
        },
        {
          name: "NSFW",
          value: "```" + nsfw + "```",
          inline: true,
        },
        {
          name: "Position",
          value: "```" + rawPosition + "```",
          inline: true,
        },
        {
          name: "Topic",
          value: "```" + `${topic !== null ? topic : "No Topic"}` + "```",
        }
      );
    message.channel.send(embed);
  },
};