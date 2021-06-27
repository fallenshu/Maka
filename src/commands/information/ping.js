const Discord = require('discord.js')
const main = "E6E6FA"

module.exports = {
  name: "ping",
  aliases: ["p", "botping"],
  desc: "Displays the bots ping.",
  category: "Information",
  async execute(message, client, args, p, m) {
    const e = new Discord.MessageEmbed()
      .setAuthor(`Pong!`)
      .setDescription(`🏓 \`${client.ws.ping}\` Ms`)
      .setColor(m);

    message.channel.send(e);
  },
};