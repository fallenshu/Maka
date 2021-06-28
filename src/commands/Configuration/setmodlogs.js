const ModLogsSchema = require('../../models/modlogs')

module.exports = {
    name: 'setmodlogs',
    desc: 'Setup mod logs',
    usage: 'setmodlogs <channel>',
    example: 'setmodlogs #Modlogs',
    async execute(message, client, args, p, m){
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        const e = `**${message.author.username}**, Modlogs has been set to ${channel}`
    if(message.member.hasPermission('ADMINISTRATOR')) {


        if(!channel) return message.channel.send(`**${message.author.username}**, Please supply a channel!`)


        ModLogsSchema.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if(data) {

                await ModLogsSchema.findOneAndRemove({GuildID: message.guild.id})

                new ModLogsSchema({
                    GuildID: message.guild.id,
                    ChannelID: channel.id
                }).save()

                message.channel.send(e)
            } else if(!data) {
           new ModLogsSchema({
                    GuildID: message.guild.id,
                    ChannelID: channel.id
                }).save()

                message.channel.send(e)
            }
        })
    } else {
      return message.channel.send(
        `**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`
      );
    }
    }
}