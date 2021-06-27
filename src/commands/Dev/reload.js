const fs = require("fs");
const Discord = require("discord.js");


module.exports = {
  name: "reload",
  aliases: ["regen"],
  desc: "Reloads a command!",
  usage: "reload <command>",
  example: 'reaload help',
  category: 'Owner Only',
  ownerOnly: true,
  async execute(message, client, args, p, m) {
    const commandName = args[0].toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {

      return message.channel.send(
        `**${message.author.username}**, Can not find command under the name of \`${command}\``
      );
    }

    const commandFolders = fs.readdirSync("./src/commands");
    const folderName = commandFolders.find((folder) =>
      fs.readdirSync(`./src/commands/${folder}`).includes(`${command.name}.js`)
    );

    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);


      message.channel.send(
        `**${message.author.username}**, Reloaded command • \`${command.name}\`.`
      );
    } catch (error) {

      return message.channel.send(
        `**${message.author.username}**, There was an error reloading \`${command.name}\`.`
      );
    }
  },
};
