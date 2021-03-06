const Discord = require('discord.js')

module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp", "av"],
  desc: "Display the avatar of the mentioned user.",
  usage: "avatar <@user>",
  category: "Information",
  async execute(message, client, args, p, m) {
     const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    const member = message.guild.members.cache.get(user.id);

    const av = member.user.displayAvatarURL({ size: 1024, dynamic: true });
    const embed = new Discord.MessageEmbed()
      .setDescription(`[Download](${av})`)
      .setImage(av)
      .setColor(m);

    message.channel.send(embed);
  },
};