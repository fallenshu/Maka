const Discord = require("discord.js");
const { m } = require("../../config.json");
const main = m;

module.exports = {
  name: "ban",
  desc: "Bans a user from the current server.",
  category: 'Moderation',
  async execute(message, client, args, p ) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);

      if (user) {
        const member = message.guild.member(user);
        let reason = args.slice(1).join(" ") || "No reason provided.";
        if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

        if (member) {
          member.ban({ reason: `${reason}` })
            .then(() => {
              message.channel.send(`\`${user.id}\` • ${user.tag} has been banned.`);
            })
            .catch((err) => {
              console.log(err);
              message.channel.send(`Error occured banning this user!`);
            })
            member
            .send(`You have been banned from ${message.guild.name} • ${reason}`)
            .catch((err) => {
              return;
            })

        } else {
          return message.channel.send(
            `**${message.author.username}**, Can not find that user from this server.`
          );
        }
      } else {
        return message.channel.send(
          `**${message.author.username}**, Please mention a user for me to ban.`
        );
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`BAN_MEMBERS\` permission that is needed to run this command.`
      );
    }
  },
};
