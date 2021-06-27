const warnSchema = require('../../models/note')
const Discord = require('discord.js')



module.exports = {
  name: "delnote",
  usage: "delnote <user> <note ID>",
  desc: "Delete a note from a user.",
  category: "Moderation",
  async execute(message, client, args, p, m) {
      const main = m;
    if (message.member.hasPermission("ADMINISTRATOR")) {
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
            `**${message.author.username}**, Please mention a user then note ID. • Note ID(s) can be found by doing \`${p}notes <user>\``
          );
        }

        if (!args[0] === user.toString()) {
          return message.channel.send(
            `**${message.author.username}**, Please mention a user.`
          );
        }

        await warnSchema.updateOne({
          $pull: { Notes: { noteID: `${args[1]}` } },
        });

        message.channel.send(
          `Deleted note \`${args[1]}\` from **${
            message.guild.members.cache.get(user.id).user.tag
          }**`
        );
      } else if (!data) {
        message.channel.send(
          `**${message.author.username}**, Could not find any data for ${
            message.guild.members.cache.get(user.id).user.tag
          }`
        );
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
      );
    }
  },
};