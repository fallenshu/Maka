const noteSchema = require('../../models/note')

module.exports = {
  name: "note",
  desc: "Add a note to a user.",
  category: "Moderation",
  async execute(message, client, args, p, m) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.delete({ timeout: 100 });
      const user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      const note = args.slice(1).join(" ");
      if (!user) {
        return message.channel.send(
          `**${message.author.username}**, Please supply a user to add a note too.`
        );
      }

      if (!note) {
        return message.channel.send(
          `**${message.author.username}**, Please supply a note for that user.`
        );
      }

      const data = await noteSchema.findOne({
        UserID: user.id,
        GuildID: message.guild.id,
      });

      if (data) {
        data.Notes.unshift({
          Author: message.author.tag,
          Note: note,
          noteID: noteIDRandom(),
        });
        data.save();

        message.channel
          .send(`Added note to **${user.username}**.`)
          .then((msg) => {
            msg.delete({ timeout: 4000 });
          });
      } else if (!data) {
        const newData = new noteSchema({
          GuildID: message.guild.id,
          UserID: user.id,
          Notes: [
            {
              Author: message.author.tag,
              Note: note,
              noteID: noteIDRandom(),
            },
          ],
        });

        newData.save();

        
       client.modlogs({
        Member: args[0],
        Action: 'Note Added.',
        ID: user.id,
        AV: user.displayAvatarURL() || client.user.displayAvatarURL(),
        MODERATOR: message.author,
        Reason: note + ` - Note ID: \`${noteIDRandom()}\``
      }, message)

        message.channel
          .send(`Added note to **${user.username}**.`)
          .then((msg) => {
            msg.delete({ timeout: 4000 });
          });

      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
      );
    }
  },
};

function noteIDRandom() {
    const ch = '1234567890qwertyuiopasdfghjklzxcvbnm--';
    let str = '';
    for (let index = 0; index <= 15; index++) {
      str += ch[Math.floor(Math.random() * ch.length)];
    }
    return str;
  }