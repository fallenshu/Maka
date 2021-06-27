const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "commands", "cmds"],
  desc: "A list of all commands and per command info",
  category: "Misc",
  async execute(message, client, args, p, m) {
    const enabled = `<:enabledCMD:858740050283069450>`;
    const disable = `<:disabledCMD:858740050292244480>`;
    if (!args.length) {
      const ModerationEmbed = new MessageEmbed()
        .setAuthor(`Moderation Commands.`, client.user.displayAvatarURL())
        .setDescription(
          `\
            \n${enabled} \`Ban         ::\` Ban a user from the current server.\
            \n${enabled} \`Unban       ::\` Unban a user from the server using there ID.\
            \n${enabled} \`Kick        ::\` Kick a user from the current server.\
            \n${disable} \`Mute        ::\` Mute a user from speaking in the server.\
            \n${enabled} \`Nick        ::\` Set a nickname for the user.\
            \n${enabled} \`Warn        ::\` Warn a member.\
            \n${enabled} \`Delwarn     ::\` Delete a warn from a user with the warn ID.\
            \n${enabled} \`Warns       ::\` Get a list of all warns and warn ID(s) for the member.\
            \n${enabled} \`Clearwarns  ::\` Clear all warns for a member.\
            \n${enabled} \`Note        ::\` Add note(s) about a member.\
            \n${enabled} \`Delnote     ::\` Delete a note from a user with the note ID\
            \n${enabled} \`Notes       ::\` Get a list of all notes and note ID(s) for the member.\
            \n${enabled} \`Clearnotes  ::\` Clear all notes for a member.\
            \n${enabled} \`Slowmode    ::\` Set a slowmode for a channel.\
            `
        )
        .setTimestamp()
        .setColor(m);

        const OwnerOnlyEmbed = new MessageEmbed()
          .setAuthor(`Owner Commands.`, client.user.displayAvatarURL())
          .setDescription(
            `\
          \n${enabled} \`Reload     ::\` Reload a command.\
          \n${enabled} \`SetNews    ::\` Set / Update the \`${p}news\` command.\
          \n${enabled} \`test       ::\` A test command.\
          `
          )
          .setTimestamp()
          .setColor(m);

          const miscEmbed = new MessageEmbed()
            .setAuthor(`Misc Commands.`, client.user.displayAvatarURL())
            .setDescription(
              `\
          \n${enabled} \`Afk      ::\` Go afk with a reason.\
          \n${enabled} \`Help     ::\` Displays all commands.\
          \n${enabled} \`News      ::\` See all latest news / updates for maka.\
          `
            )
            .setTimestamp()
            .setColor(m);

             const infoEmbed = new MessageEmbed()
               .setAuthor(
                 `Information Commands.`,
                 client.user.displayAvatarURL()
               )
               .setDescription(
                 `\
          \n${enabled} \`Avatar         ::\` Display the mentioned users avatar.\
          \n${enabled} \`Channelinfo    ::\` Displays all information about a channel.\
          \n${enabled} \`MemberCount    ::\` See the total member count for the current server.\
          \n${enabled} \`Ping           ::\` See makas ping.\
          \n${enabled} \`Roleinfo       ::\` Display all information about a role.\
          \n${enabled} \`serverinfo     ::\` See all information about a server.\
          `
               )
               .setTimestamp()
               .setColor(m);

           const configEmbed = new MessageEmbed()
               .setAuthor(
                 `Configuration Commands.`,
                 client.user.displayAvatarURL()
               )
               .setDescription(`\
          \n${enabled} \`Setleavemsg         ::\` Set a custom leave message.\
          \n${enabled} \`Setwelcomemsg   ::\` Set a custom welcome message.\
          \n${enabled} \`prefix     ::\` Add or reset the custom prefix.\
          \n${enabled} \`suggestions ::\` Add or remove the custom suggestions channel\
          \n${disable} \`mutesettings    ::\` Setup mute settings for the \`${p}mute\` command.\
          `
               )
               .setTimestamp()
               .setColor(m);

      const Mainembed = new MessageEmbed()
        .setAuthor(`Makas Commands`, client.user.displayAvatarURL())
        .setDescription(
          `Prefix: \`${p}\`\n for more info on each command please do \n\`${p}help <command>\`
          
          🏠 • **Help Menu**
          🎭 • **Misc**
          🛡️ • **Moderation**
          📚 • **Information**
          ⚙️ • **Configuration**
          🔒 • **Owner Only** `
        )
        .setTimestamp()
        .setColor(m);

      const msg = await message.channel.send(Mainembed);
      await msg.react(`🏠`);
      await msg.react(`🎭`);
      await msg.react(`🛡️`);
      await msg.react(`📚`);
      await msg.react(`⚙️`);
      await msg.react(`🔒`);

      const collector = msg.createReactionCollector(
        (reaction, user) =>
          message.guild.members.cache.find((member) => member.id === user.id),
        { dispose: true }
      );

      collector.on("collect", async (reaction, user) => {
        reaction.users.remove(user.id);

        if (user.id === message.author.id) {
          switch (reaction.emoji.name) {
             case "🏠":
              msg.edit(Mainembed);
              break;
             case "🎭":
              msg.edit(miscEmbed);
              break;
             case "🛡️":
              msg.edit(ModerationEmbed);
              break; 
               case "📚": 
              msg.edit(infoEmbed);
              break;
              case "⚙️": 
              msg.edit(configEmbed);
              break;
              case "🔒": 
              msg.edit(OwnerOnlyEmbed);
              break;
          }
        } else {
          return;
        }
      });
    } else {
      const commandName = args.shift().toLowerCase();

      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) {
        return message.channel.send(
          `**${message.author.username}**, Could not find command.`
        );
      }

      const embed = new MessageEmbed()
        .setAuthor(
          `Command: ${p}${command.name}`,
          client.user.displayAvatarURL()
        )
        .setDescription(
          `**Description:** ${
            command.desc != undefined ? command.desc : "No description."
          }\
              \n**Cooldown:** ${
                command.cooldown != undefined ? command.cooldown : "1"
              } second(s)\
              \n**Usage:** ${
                command.usage != undefined
                  ? command.usage
                  : "No usage provided."
              }\
              \n**Example:** ${
                command.example != undefined
                  ? command.example
                  : "No example provided."
              }\
              \n**Category:** ${
                command.category != undefined
                  ? command.category
                  : "No category."
              }\
              \n**Owner Only:** ${
                command.ownerOnly != undefined ? command.ownerOnly : "false"
              }`
        )
        .setColor(m);

      return message.channel.send(embed);
    }
  },
};
