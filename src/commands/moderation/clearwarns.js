const warnSchema = require('../../models/warn')
const Discord = require('discord.js')



module.exports = {
  name: "clearwarns",
  aliases: ["wipewarns"],
  desc: "Clear all warns for a mentioned user.",
  category: "Moderation",
  async execute(message, client, args, p, m) {
      const main = m;
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args[0]) ||
        message.author;
      const data = await warnSchema.findOne({
        UserID: user.id,
      });

      if (!user) {
        return message.channel.send(
          `**${message.author.username}**, Please mention a user that you wish to clear there warns for.`
        );
      }

      if (data) {
        message.channel.send(
          `**${message.author.username}**, Deleted ${data.Warns.length} warn(s) from **${user.tag}**.`
        );

        client.modlogs({
        Member: user.tag,
        Action: 'Clear warn(s)',
        ID: user.id,
        AV: user.displayAvatarURL() || client.user.displayAvatarURL(),
        MODERATOR: message.author,
        Reason: `Total warn(s) removed - ${data.Warns.Length}`
      }, message)

        await warnSchema.findOneAndRemove({
          UserID: user.id,
        });

        
      } else if (!data) {
        message.channel.send(
          `**${message.author.username}**, Cant find any warns for this user.`
        );
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
      );
    }
  },
};