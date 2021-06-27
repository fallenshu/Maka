const welcomeSchema = require("../../models/leave");

const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "setleavemsg",
  desc: "Setup a custom leave message!",
  category: "Configuration",
  example: "setleavemsg #goodbye hello {user}!",
  usage: "setleavemsg <channel> <leavemsg>",
  async execute(message, client, args, p, m) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          const channel = message.mentions.channels.first();
          const msg = args.slice(1).join(" ");

          if (!args.length) {
            const e = new MessageEmbed()
              .setAuthor(`Leave Message`)
              .setDescription(
                `
            \`${p}leavemsg <channel> <message>\``
              )
              .addFields({
                name: "Extra Configuration",
                value: `\`\`\`Mention the users tag: {user}\nThe Guild Name: {server}\nThe servers new memberCount: {memberCount}\`\`\``,
              })
              .setColor(m);

            return message.channel.send(e);
          }

          if (args[0] != channel.toString()) {
            return message.channel.send(
              `**${message.author.username}**, Incorrect usage. \`${p}setleavemsg <channel> <leavemsg>\``
            );
          }

          if (!msg) {
            return message.channel.send(
              `**${message.author.username}**, Please supply a message.`
            );
          }

          const data = await welcomeSchema.findOneAndRemove({
            GuildID: message.guild.id,
          });

          if (data) {
            await welcomeSchema.findOneAndRemove({
              GuildID: message.guild.id,
            });

            const newData = new welcomeSchema({
              ChannelID: channel.id,
              Txt: msg,
              GuildID: message.guild.id,
            });

            newData.save();

            message.channel.send(
              `Updated leave config.\n \`\`\`Channel ID: ${channel.id}\nMessage: ${msg}\`\`\``
            );
          } else if (!data) {
            const newData = new welcomeSchema({
              ChannelID: channel.id,
              Txt: msg,
              GuildID: message.guild.id,
            });

            newData.save();

            message.channel.send(
              `Set leave config.\n \`\`\`Channel ID: ${channel.id}\nMessage: ${msg}\`\`\``
            );
          }
        } else {
          return message.channel.send(
            `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
          );
        }
  },
};
