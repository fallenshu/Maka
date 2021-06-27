const suggestionsSchema = require("../../models/suggestions");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "suggestions",
  desc: "Add or remove the custom suggestions channel.",
  category: "Configuration",
  usage: "suggesions add <channel> | suggestions remove",
  example: "suggestions add #suggestions",
  async execute(message, client, args, p, m) {
    if (message.member.hasPermission("ADMINISTRATOR")) {

        if(!args.length) {
            const e = new MessageEmbed()
            .setAuthor(`Suggestions Commands`, message.author.displayAvatarURL())
            .setDescription(`
            \`suggestions add <channel> :\` Add a suggestions channel.
            \`suggestions remove : \` Remove the suggestions channel.`)
            .setColor(m)

            return message.channel.send(e)
        }
      const data = await suggestionsSchema.findOne({
        GuildID: message.guild.id,
      });

      if (args[0].toLowerCase() == "add") {
        const channel = message.mentions.channels.first() || message.channel;

        if (!channel) {
          return message.channel.send(
            `**${message.author.username}**, That is not a vaild channel.`
          );
        }

        if (data) {

                 const oldChannel = message.guild.channels.cache.get(data.ChannelID)
                 oldChannel.setRateLimitPerUser(null)
                 setTimeout(async () => {
           await suggestionsSchema.findOneAndRemove({
            GuildID: message.guild.id,
          });

          const newData = new suggestionsSchema({
            ChannelID: channel.id,
            GuildID: message.guild.id,
          });
          newData.save();
          message.channel
            .send(
              `Updated suggestions channel to ${channel} • ID: \`${channel.id}\``
            )
            .then((msg) => {
              msg.delete({ timeout: 4000 });
            });

          channel.setRateLimitPerUser(21600 / 2);
                 }, 1000);

        } else if (!data) {
          const newData = new suggestionsSchema({
            ChannelID: channel.id,
            GuildID: message.guild.id,
          });
          newData.save();
          message.channel
            .send(
              `Set suggestions channel to ${channel} • ID: \`${channel.id}\``
            )
            .then((msg) => {
              msg.delete({ timeout: 4000 });
            });

          channel.setRateLimitPerUser(21600 / 2);
        }
        const e = new MessageEmbed()
          .setAuthor(`Suggestions!!!`)
          .setDescription(
            `This now the suggestions channel! To simply suggest something just type in the channel!`
          )
          .setFooter(`Slowmode has been set to 3 hours to stop spam.`)
          .setColor(m);

        channel.send(e);

      } else if (args[0].toLowerCase() == "remove") {
        if (data) {
          await suggestionsSchema.findOneAndRemove({
            GuildID: message.guild.id,
          });

          message.channel
            .send(
              `**${message.author.username}**, I have removed the suggestions channel.`
            )
            .then((msg) => {
              msg.delete({ timeout: 4000 });
            });
        } else if (!data) {
          return message.channel.send(
            `**${message.author.username}**, There was no suggestions channel for this server.`
          );
        }
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
      );
    }
  },
};
