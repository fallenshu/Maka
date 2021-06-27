const Discord = require('discord.js')
const main = "E6E6FA"


module.exports = {
  name: "serverinfo",
  aliases: ["si", "guildinfo"],
  desc: "Get all information about the current server.",
  usage: "serverinfo",
  category: "Information",
  async execute(message, client, args, p, m) {
    const { guild } = message;
    const {
      name,
      owner,
      ownerID,
      region,
      memberCount,
      premiumSubscriptionCount,
      premiumTier,
    } = guild;
    const icon = guild.iconURL();
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Server: ${name}`, icon || message.author.displayAvatarURL())
      .addFields(
        {
          name: "Owner",
          value: `${owner}  \`\`\`ID: ${ownerID}\`\`\``,
        },
        {
          name: "Server ID",
          value: `\`\`\`${message.guild.id}\`\`\``,
        },
        {
          name: "Region",
          value: `\`\`\`${region}\`\`\``,
        },
        {
          name: "Member Count",
          value: `\`\`\`${memberCount}\`\`\``,
          inline: true,
        },
        {
          name: "Channel Count",
          value: `\`\`\`${message.guild.channels.cache.size - 3}\`\`\``,
          inline: true,
        },
        {
          name: "Role Count",
          value: `\`\`\`${message.guild.roles.cache.size - 1}\`\`\``,
          inline: true,
        },
        {
          name: "Booster Information",
          value: `\`\`\` ${premiumSubscriptionCount} Boosts • Level ${premiumTier}\`\`\``,
        }
      )
      .setColor(m);

    message.channel.send(embed);
  },
};