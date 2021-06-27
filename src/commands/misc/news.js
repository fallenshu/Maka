const newsSchema = require('../../models/news')
const { MessageEmbed } = require('discord.js')


module.exports = {
  name: "news",
  category: "Misc",
  desc: "Get a list of the most recent news / updates for maka",
  async execute(message, client, args, p, m) {
    const d = await newsSchema.findOne({
      ClientID: client.user.id,
    });

    const embed = new MessageEmbed()
      .setAuthor(`News for Maka`, client.user.displayAvatarURL())
      .setDescription(d.news)
      .setColor(m);

    message.channel.send(embed);
  },
};