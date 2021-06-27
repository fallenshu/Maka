const noteSchema = require('../../models/note')
module.exports = {
  name: "clearnotes",
  aliases: ["wipenotes"],
  desc: "Clear all notes for a mentioned user.",
  category: "Moderation",
  async execute(message, client, args, p, m) {
    message.delete({ timeout: 100 });
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.author;

      const data = await noteSchema.findOne({
        UserID: user.id,
        GuildID: message.guild.id,
      });

      if (data) {
        await noteSchema.findOneAndRemove({
          UserID: user.id,
        });

        message.channel.send(`Deleted all notes for **${user.tag}**`);
      } else if (!data) {
        const r = [Math.floor(Math.random() * 50)];

        if (r == "50") {
          message.channel.send(
            `There are no notes saved for **${user.tag}** • you can add a note by doing \`${p}note <user> <note>\``
          );
        } else {
          message.channel.send(`There are no notes saved for **${user.tag}**`);
        }
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
      );
    }
  },
};