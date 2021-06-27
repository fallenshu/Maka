const newsschema = require ('../../models/news')

module.exports = {
  name: "setnews",
  desc: "Update / add new news to the news command for maka",
  category: "Owner Only",
  ownerOnly: true,
  async execute(message, client, args, p, m) {
    message.delete({ timeout: 1000 });
    const newNews = args.join(" ");

    const data = await newsschema.findOne({
      ClientID: client.user.id,
    });

    if (data) {
      await newsschema.findOneAndRemove({
        ClientID: client.user.id,
      });

      const newData = new newsschema({
        ClientID: client.user.id,
        news: newNews,
      });
      newData.save();

      message.channel.send(
        `**${message.author.username}**, Updated news. it can now been seen by doing \`${p}news\``
      );
    } else if (!data) {
      const newData = new newsschema({
        ClientID: client.user.id,
        news: newNews,
      });
      newData.save();

      message.channel.send(
        `**${message.author.username}**, Set news. it can now been seen by doing \`${p}news\``
      );
    }
  },
};