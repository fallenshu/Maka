module.exports = {
  name: "membercount",
  aliases: ["mc"],
  desc: "Displays the servers total membercount.",
  usage: "membercount",
  category: 'Information',
  async execute(message, client, args, p, m) {

    message.channel.send(`**${message.guild.name}** has **${message.guild.memberCount}** member(s).`)
  }
}