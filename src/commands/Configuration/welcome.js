const welcomeSchema = require('../../models/welcome')

const { MessageEmbed } = require('discord.js')


module.exports = {
  name: "setwelcomemsg",
  desc: "Setup a custom welcome message!",
  category: "Configuration",
  example: "setwelcomemsg #welcome hello {user}!",
  usage: "setwelcomemsg <channel> <welcomemsg>",
  async execute(message, client, args, p, m) {
          if (message.member.hasPermission("ADMINISTRATOR")) {
            const channel = message.mentions.channels.first();
            const msg = args.slice(1).join(" ");

            if (!args.length) {
              const e = new MessageEmbed()
                .setAuthor(`Welcome Message`)
                .setDescription(
                  `
            \`${p}welcomemsg <channel> <message>\``
                )
                .addFields({
                  name: "Extra Configuration",
                  value: `\`\`\`Mention the user: {user}\nThe Guild Name: {server}\nThe servers new memberCount: {memberCount}\`\`\``,
                })
                .setColor(m);

              return message.channel.send(e);
            }

            if (args[0] != channel.toString()) {
              return message.channel.send(
                `**${message.author.username}**, Incorrect usage. \`${p}setwelcomemsg <channel> <welcomemsg>\``
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
                `Updated welcome config.\n \`\`\`Channel ID: ${channel.id}\nMessage: ${msg}\`\`\``
              );
            } else if (!data) {
              const newData = new welcomeSchema({
                ChannelID: channel.id,
                Txt: msg,
                GuildID: message.guild.id,
              });

              newData.save();

              message.channel.send(
                `Set welcome config.\n \`\`\`Channel ID: ${channel.id}\nMessage: ${msg}\`\`\``
              );
            }
          } else {
            return message.channel.send(
              `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
            );
          }
  },
};