const afk = require('../../models/afk')


module.exports = {
  name: "afk",
  desc: "Go afk with a reason!",
  category: "Misc",
  async execute(message, client, args, p, m) {
    if (message.mentions.roles.first()) {
      return message.channel.send(
        `**${message.author.username}**, Please do not ping roles in your reason.`
      );
    }
    if (message.mentions.users.first()) {
      return message.channel.send(
        `**${message.author.username}**, Please do not ping users in your reason.`
      );
    }

    const self = message.guild.members.cache.find(
      (m) => m.id === client.user.id
    ).roles.highest.position;

    const data = await afk.findOne({
      UserID: message.author.id,
    });

    if (!data) {
      const reason = args.slice(0).join(" ") || "No Reason";
      message.channel.send(
        `**${message.author.username}**, You are now **AFK**. Reason: **${reason}**`
      );
      const newAfk = new afk({
        UserN: message.member.id,
        UserID: message.author.id,
        Reason: reason,
      });
      newAfk.save();

      message.member
        .setNickname(`AFK • ${message.author.username}`)
        .catch((err) => {
          message.channel.send(`Error occured setting your nickname to AFK.`);
        });
    } else if (data) {
      message.channel.send(
        `${message.author.username}, welcome back! I removed your AFK.`
      );

      await afk.deleteOne({
        UserID: message.author.id,
      });
    }
  },
};