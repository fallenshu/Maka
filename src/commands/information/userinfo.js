const Discord = require('discord.js')
const main = "E6E6FA"
const moment = require('moment');

module.exports = {
  name: "whois",
  aliases: ["userinfo"],
  desc: "Display information about the pinged user.",
  usage: "whois <@user>",
  category: "Information",
  async execute(message, client, args, p, m) {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);

    let boostserv = member.premiumSince;
    if (boostserv === null) boostserv = "No Boost(s)";

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${user.username}#${user.discriminator}`,
        user.displayAvatarURL()
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor(m)
      .addFields(
        {
          name: "Boost info",
          value: "" + boostserv + "",
          inline: true,
        },
        {
          name: "Joined",
          value: member.joinedAt.toLocaleString(),
        },
        {
          name: "Registered",
          value: member.user.createdAt.toLocaleString(),
        },
        {
          name: `Roles [${member.roles.cache.size}]`,
          value: member.roles.cache
            ? member.roles.cache.map((r) => `${r}`).join(", ")
            : "",
        }
      )
      .setFooter(`ID: ${user.id}`);

    message.channel.send(embed);
  },
};