const { MessageEmbed } = require("discord.js");
const { m } = require('../../config.json')
const muteSchema = require("../../models/mute");
const main = m

module.exports = {
  name: "muteconfig",
  aliases: ["mutesettings"],
  desc: "Setup mute & unmute for your server!",
  category: 'Configuration',
  async execute(message, client, args, p) {
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

      if(!mrole) {
          return message.channel.send(`**${message.author.username}**, Please supply a real Muted role.`)
      };

      if(!nrole) {
        return message.channel.send(`**${message.author.username}**, Please supply a real Member role.`)
    };

      const newData = new muteSchema({
        GuildID: message.guild.id,
        MutedRole: mutedRoleC.id,
        NormalRole: NormalRoleC.id,
      });
      newData.save();


      message.channel.send(
        `**${message.author.username}**, Data saved. • Member Role: \`${NormalRoleC}\` | Muted Role:\`${mutedRoleC}\``
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
  
        if(!mrole) {
            return message.channel.send(`**${message.author.username}**, Please supply a real Muted role.`)
        };
  
        if(!nrole) {
          return message.channel.send(`**${message.author.username}**, Please supply a real Member role.`)
      };
  
        const newData = new muteSchema({
          GuildID: message.guild.id,
          MutedRole: mutedRoleC.id,
          NormalRole: NormalRoleC.id,
        });
        newData.save();
  
  
        message.channel.send(
          `**${message.author.username}**, Data saved. • Member Role: \`${NormalRoleC}\` | Muted Role:\`${mutedRoleC}\``
        );
  
    }
  },
};
