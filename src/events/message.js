
const Discord = require("discord.js");
const { prefix, m } = require("../config.json");

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (message.channel.type === "dm") {
            return;
          }
        
          if (!message.content.startsWith(prefix) || message.author.bot) return;
          const args = message.content.slice(prefix.length).trim().split(/ +/);
          const commandName = args.shift().toLowerCase();
        
          const command =
            client.commands.get(commandName) ||
            client.commands.find(
              (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );
        
          if (!command) return;
        
          const { cooldowns } = client;
        
          if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
          }
        
          const now = Date.now();
          const timestamps = cooldowns.get(command.name);
          const cooldownAmmount = (command.cooldown || 3) * 1000;
        
          if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmmount;
        
            if (now < expirationTime) {
              const timeLeft = (expirationTime - now) / 1000;
              const smOncmds = new Discord.MessageEmbed()
                .setAuthor(`Cooldown!`)
                .setDescription(
                  `Please wait \`${timeLeft.toFixed(
                    1
                  )}\` more second(s) before reusing that command`
                )
                .setColor(m);
        
              return message.channel.send(smOncmds);
            }
          }
        
          timestamps.set(message.author.id, now);
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmmount);
        

          if(command.ownerOnly) {
              if(message.author.id == '462936117596127232') {

              } else {
                const ownerOnly = new Discord.MessageEmbed()
                .setAuthor(`Owner Only Command!`)
                .setDescription(`This command is a owner only command!`)
                .setColor(m)

                return message.channel.send(ownerOnly)
              }

          }
          try {
            client.commands.get(command.name).execute(message, client, args);
          } catch (err) {
            console.log(err);
        
            const failed = new Discord.MessageEmbed()
              .setAuthor(`Error Occured!`)
              .setDescription(`There was an error with running that command!`)
              .setColor(m);
        
            return message.channel.send(failed);
          }
    }
}