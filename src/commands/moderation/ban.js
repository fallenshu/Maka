const Discord = require("discord.js");


module.exports = {
  name: "ban",
  desc: "Bans a user from the current server.",
  category: "Moderation",
  async execute(message, client, args, p, m) {
    const main = m;
    if (message.member.hasPermission("BAN_MEMBERS")) {
      message.delete({ timeout: 1000 });
      const user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);

      if (message.guild.member(user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send(
          `**${message.author.username}**, I can not ban this user as they have the \`BAN_MEMBERS\` permission.`
        );
      }

      if (user) {
        const member = message.guild.member(user);

        if (
          member.roles.highest.position >=
          message.guild.me.roles.highest.position
        )
          return message.channel.send(
            `**${message.author.username}**, I can not ban that user because they have a higher role than my higher role or we have the same role.`
          );
        if (
          member.roles.highest.position >= message.member.roles.highest.position
        )
          return message.channel.send(
            `**${message.author.username}**, I can not ban that user because they have a higher or the same role than you.`
          );

        let reason = args.slice(1).join(" ") || "No reason provided.";
        if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

        if (member) {
          member
             .ban({ reason: `${reason}` })
            .then(() => {
              message.channel.send(
                `\`${user.id}\` • **${user.tag}** has been banned.`
              );

        client.modlogs({
        Member: user.tag,
        Action: 'Ban',
        ID: user.id,
        AV: user.displayAvatarURL() || client.user.displayAvatarURL(),
        MODERATOR: message.author,
        Reason: reason
      }, message)
            })
            .catch((err) => {
              console.log(err);
              message.channel.send(`Error occured banning this user!`);
            });
          member
            .send(`You have been banned from ${message.guild.name} • ${reason}`)
            .catch((err) => {
              return;
            });
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
