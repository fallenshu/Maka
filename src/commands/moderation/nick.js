const { Message, MessageEmbed } = require("discord.js");


module.exports = {
  name: "setnick",
  aliases: ["setnickname", "mod",'nick'],
  usage: "setnick <member> [nickname]",
  desc: "Channge a members name",
  category: "Moderation",
  async execute(message, client, args, p, m) {
      const main = m;
    if (
      !message.member.hasPermission("MANAGE_NICKNAMES" || "ADMINISTRATOR") ||
      !message.guild.owner
    )
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`MANAGE_NICKNAMES\` permission that is needed to run this command.`
      );

    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES" || "ADMINISTRATOR"))
      return message.channel.send(
         `**${message.author.username}**, I do not have the \`MANAGE_NICKNAMES\` permission that is needed for me to perform this command.`
      );

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.id === args[0]);

    if (!args[0])
      return message.channel.send(
        `**${message.author.username}**, Please mention a user or user ID.`
      );

    if (!member) {
      let notfound = new MessageEmbed()
        .setDescription(` Couldn't find that user.`)
        .setColor(main);
      await message.channel.send(notfound);
      return;
    }

    let self = message.guild.members.cache.find((m) => m.id === client.user.id)
      .roles.highest.position;

    if (member.roles.highest.position > self)
      return message.channel.send(
        `**${message.author.username}**, That members higest role is higher than my highest role.`
      );
    let newnick = args.slice(1).join(" ");

    if (!newnick) {
      const newNick2 = nickRandom();
      const e = new MessageEmbed()
        .setDescription(`Moderated Nickname • \`${newNick2}\``)
        .setColor(m);
      await message.channel.send(e);
      member.setNickname(`Moderated Nickname ${newNick2}`);
    } else {
      const e2 = new MessageEmbed()
        .setDescription(
          `Updated ${member.user.tag}'s nickname • \`${newnick}\``
        )
        .setColor(m);
      await message.channel.send(e2);
      member.setNickname(newnick);
    }

    return;
  },
};

function nickRandom() {
    const ch = '1234567890qwertyuiopasdfghjklzxcvbnm-._';
    let str = '';
    for (let index = 0; index <= 10; index++) {
      str += ch[Math.floor(Math.random() * ch.length)];
    }
    return str;
  }