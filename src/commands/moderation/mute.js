const ms = require('ms')
const Discord = require('discord.js')
const main = 'E6E6FA'
const muteSchema = require('../../models/userMuted')
const mschema = require('../../models/mute')


module.exports = {
  name: "mute",
  aliases: ["silence"],
  desc: "Permently / time mute a user!",
  category: "Moderation",
  disabled: true,
  reason:
    "MS (npm package) is broken meaning timed mutes will not work as intended.",
  async execute(message, client, args, p, m) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      const d = await mschema.findOne({
        GuildID: message.guild.id,
      });

      if (d) {
        message.delete({ timeout: 100 });

        const target =
          message.mentions.users.first() ||
          message.client.users.cache.get(args[0]);

        const data = await muteSchema.findOne({
          UserID: target.id,
        });

        if (target) {
          const member = message.guild.member(target);
          if (
            member.roles.highest.position >=
            message.guild.me.roles.highest.position
          )
            return message.channel.send(
              `**${message.author.username}**, Cant mute user that has a higher role than you or has the same role as you.`
            );
          if (
            member.roles.highest.position >=
            message.member.roles.highest.position
          )
            return message.channel.send(
              `**${message.author.username}**, Cant mute user that has a higher role than me or has the same role as me.`
            );
          const user = message.guild.members.cache.get(target.id);

          if (!args[1]) {
            user.roles.add(d.MutedRole);
            user.roles.remove(d.NormalRole);

            message.channel.send(`${user} has been permently muted.`);

            if (data) {
              return;
            } else if (!data) {
              const newData = new muteSchema({
                UserID: target.id,
              });

              newData.save();
            }
          }

          if (args[1]) {
            user.roles.add(d.MutedRole);
            user.roles.remove(d.NormalRole);

            message.channel.send(`Muted ${user} for \`${args[1]}\``);

            if (data) {
              return;
            } else if (!data) {
              const newData = new muteSchema({
                UserID: target.id,
              });

              newData.save();
            }

            setTimeout(async () => {
              user.roles.remove(d.MutedRole);
              user.roles.add(d.NormalRole);

              await muteSchema.findOneAndRemove({
                UserID: target.id,
              });
            }, ms(args[1]));
          }
        }
      } else if (!d) {
        return message.channel.send(
          `**${message.author.username}**, I could not find any data for this server. • To setup a muted and member role please do \`${p}mutesettings\``
        );
      }
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`KICK_MEMBERS\` permission that is needed to run this command.`
      );
    }
  },
};
