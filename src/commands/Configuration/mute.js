const { MessageEmbed } = require("discord.js");

const muteSchema = require("../../models/mute");


module.exports = {
  name: "muteconfig",
  aliases: ["mutesettings"],
  desc: "Setup mute & unmute for your server!",
  category: "Configuration",
  async execute(message, client, args, p, m) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          const main = m;
          const data = await muteSchema.findOne({
            GuildID: message.guild.id,
          });

          if (data) {
            await muteSchema.findOneAndRemove({
              GuildID: message.guild.id,
            });

            const iu = `**${message.author.username}**, Please use the correct usage. • \`${p}mutesetttings <Member Role> <Muted Role>\``;

            const userArray = message.mentions.roles.array();
            const mutedRoleC = userArray[1];
            const NormalRoleC = userArray[0];

            if (!mutedRoleC) {
              return message.channel.send(iu);
            }

            if (!NormalRoleC) {
              return message.channel.send(iu);
            }

            const mrole = message.guild.roles.cache.get(mutedRoleC.id);
            const nrole = message.guild.roles.cache.get(NormalRoleC.id);

            if (!mrole) {
              return message.channel.send(
                `**${message.author.username}**, Please supply a real Muted role.`
              );
            }

            if (!nrole) {
              return message.channel.send(
                `**${message.author.username}**, Please supply a real Member role.`
              );
            }

            const newData = new muteSchema({
              GuildID: message.guild.id,
              MutedRole: NormalRoleC.id,
              NormalRole: mutedRoleC.id,
            });
            newData.save();

            message.channel.send(
              `**${message.author.username}**, Data saved. • Member Role: \`${mutedRoleC}\` | Muted Role: \`${NormalRoleC}\``
            );
          } else if (!data) {
            const iu = `**${message.author.username}**, Please use the correct usage. • \`${p}mutesetttings <Member Role> <Muted Role>\``;

            const userArray = message.mentions.roles.array();
            const mutedRoleC = userArray[1];
            const NormalRoleC = userArray[0];

            if (!mutedRoleC) {
              return message.channel.send(iu);
            }

            if (!NormalRoleC) {
              return message.channel.send(iu);
            }

            const mrole = message.guild.roles.cache.get(mutedRoleC.id);
            const nrole = message.guild.roles.cache.get(NormalRoleC.id);

            if (!mrole) {
              return message.channel.send(
                `**${message.author.username}**, Please supply a real Muted role.`
              );
            }

            if (!nrole) {
              return message.channel.send(
                `**${message.author.username}**, Please supply a real Member role.`
              );
            }

            const newData = new muteSchema({
              GuildID: message.guild.id,
              MutedRole: NormalRoleC.id,
              NormalRole: mutedRoleC.id,
            });
            newData.save();

            message.channel.send(
              `**${message.author.username}**, Data saved. • Member Role: \`${mutedRoleC}\` | Muted Role: \`${NormalRoleC}\``
            );
          }
        } else {
          return message.channel.send(
            `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
          );
        }
  },
};
