const warnSchema = require('../../models/warn')
const Discord = require('discord.js')


module.exports = {
  name: "delwarn",
  usage: "delwarn <user> <warnID>",
  desc: "Delete a warning from a user.",
  category: "Moderation",
  async execute(message, client, args, p, m) {
      const main = m;
    if (message.member.hasPermission("KICK_MEMBERS")) {
      message.delete({ timeout: 100 });

      const user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);

      if (!user) {
        return message.channel.send(
          `**${message.author.username}**, Please mention a user.`
        );
      }

      const data = await warnSchema.findOne({
        UserID: user.id,
      });

      if (data) {
        if (!args[1]) {
          return message.channel.send(
            `**${message.author.username}**, Please mention a user then warn ID. • Warn ID(s) can be found by doing \`${p}warns <user>\``
          );
        }

        if (!args[0] === user.toString()) {
          return message.channel.send(
            `**${message.author.username}**, Please mention a user.`
          );
        }

        await data.updateOne({
          $pull: { Warns: { WarnID: `${args[1]}` } },
        });


        client.modlogs({
        Member: user.tag,
        Action: 'Warn deleted.',
        ID: user.id,
        AV: user.displayAvatarURL() || client.user.displayAvatarURL(),
        MODERATOR: message.author,
        Reason: `Delete warn ID: \`${args[1]}\``
      }, message)

        message.channel.send(
          `Deleted warn \`${args[1]}\` from **${
            message.guild.members.cache.get(user.id).user.tag
          }**`
        );
      } else if (!data) {
        message.channel.send(
          `**${message.author.username}**, Could not find any data for **${
            message.guild.members.cache.get(user.id).user.tag
          }**`
        );
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`KICK_MEMBERS\` permission that is needed to run this command.`
      );
    }
  },
};