const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "roleinfo",
  desc: "Get information on the mentioned role.",
  usage: "roleinfo <role>",
  category: "Information",
  async execute(message, client, args, p, m) {
    if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS"))
      return message.channel.send(
        `**${message.author.username}**, Iam missing the permission to embed links.`
      );
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((r) => r.id === args[0]) ||
      message.guild.roles.cache.find((r) => r.name === args.join(" "));
    if (!args[0]) {
      message.channel.send(
        `**${message.author.username}**, Please provide a role.`
      );
      return;
    }
    if (role) {
      let ishoist = role.hoist;
      if (ishoist === true) ishoist = "Yes";
      if (ishoist === false) ishoist = "No";
      let ismentionable = role.mentionable;
      if (ismentionable === true) ismentionable = "Yes";
      if (ismentionable === false) ismentionable = "No";
      const color = m;
      if (color === "#000000") color = "None";
      const roleinfo = new MessageEmbed()
        .setColor(m)
        .addField("ID", role.id, true)
        .addField("Name", role.name, true)
        .addField("Color", role.hexColor, true)
        .addField("Mention", `\`<@&${role.id}>\``, true)
        .addField("Position", role.position, true)
        .addField("Hoist", ishoist, true)
        .addField("Mentionable", ismentionable, true)
        .setFooter(`Role Created`)
        .setTimestamp(`${role.createdAt}`);
      return message.channel.send(roleinfo);
    } else {
      return await message.channel.send(
        `**${message.author.username}**, I could not find that role.`
      );
    }
  },
};