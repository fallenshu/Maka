const warnSchema = require('../../models/warn')
const Discord = require('discord.js')


module.exports = {
  name: "warn",
  desc: "Warn a user, Kind of like a verbal warning.",
  usage: "warn <user> [reason]",
  category: "Moderation",
  async execute(message, client, args, p, m) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      message.delete({ timeout: 100 });
      const user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args[0]);
      const reason = args.slice(1).join(" ");
      const warnid = warnIDRandom();

      if (!user) {
        return message.channel.send(
          `**${message.author.username}**, Please supply a user to warn.`
        );
      }
      const data = await warnSchema.findOne({
        UserID: user.id || args[0],
        GuildID: message.guild.id,
      });

      if (data) {
        data.Warns.unshift({
          Punshment: "Warn",
          Moderator: message.author.id,
          Reason: reason ? reason : "No reason provided.",
          WarnID: warnid,
        });
        data.save();

        message.channel.send(`Warned **${user.tag}**`);
      } else if (!data) {
        const newData = new warnSchema({
          GuildID: message.guild.id,
          UserID: user.id,
          Warns: [
            {
              Punshment: "Warn",
              Moderator: message.author.id,
              Reason: reason ? reason : "No reason provided.",
              WarnID: warnid,
            },
          ],
        });
        newData.save();

        message.channel.send(`Warned **${user.tag}**`);
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`KICK_MEMBERS\` permission that is needed to run this command.`
      );
    }
  },
};

function warnIDRandom() {
    const ch = '1234567890qwertyuiopasdfghjklzxcvbnm--';
    let str = '';
    for (let index = 0; index <= 15; index++) {
      str += ch[Math.floor(Math.random() * ch.length)];
    }
    return str;
  }