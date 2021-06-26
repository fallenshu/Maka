const ms = require('ms')
const { MessageEmbed } = require('discord.js')
const { m } = require('../../config.json')
const main = m

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'slowchannel'],
    desc: 'Set a slowmode for the current channel or chosen channel!',
    example: 'slowmode <time> [channel]',
    category: 'Moderation',
    disabled: true,
    async execute(message, client, args, p) {
        if(message.member.hasPermission('MANAGE_CHANNELS' || "ADMINISTRATOR")) {
        const time = args[0]
        const reason = args.splice(1).join(" ") || 'No reason provided.'
   
        const IncorrctU = new MessageEmbed()
        .setAuthor(`Incorrect usage!`, message.author.displayAvatarURL())
        .setDescription(`slowmode time must be in \`s\`,\`m\`,\`h\`,\`d\``)
        .setColor(main)
        

        const incorect = new MessageEmbed()
        .setAuthor(`Incorrect usage!`)
        .setDescription(`slowmode <time> [channel] `)
        .setColor(main)
            const channel = message.mentions.channels.first() || message.channel

        if(!time) {
            return message.channel.send(IncorrctU)
            .then(msg => {
                msg.delete({ timeout: 2000 }) 
            })
        }
        if(
            !time.endsWith('s') &&
            !time.endsWith('m') &&
            !time.endsWith('h') &&
            !time.endsWith('d') 
        ) {

            return message.channel.send(IncorrctU)
            .then(msg => {
                msg.delete({ timeout: 3000 })
            })
        };

        if(ms(args[0]) > 21600) {
            const no = new MessageEmbed()
            .setAuthor(`Error`, message.author.displayAvatarURL())
            .setDescription(`Slowmode must be less than \`7200000 ms\` (2 hours, 120 mins, 7200s) `)
            .setColor(main)

            return message.channel.send(no)
        };

         message.channel.setRateLimitPerUser(ms(args[0]))
      
            const smSet = new MessageEmbed()
            .setAuthor(`Slowmode updated / set`)
            .setDescription(`
            > Slowmode has been set to \`${args[0]}\` in ${channel}!`)
            .setColor(main)
    
            message.channel.send(`Slowmode is set to \`${args[0]}\``)
    } else {

     const noPermis = new MessageEmbed()
    .setAuthor(`Incorrect Permission`)
    .setDescription(`You must have the \`MANAGE_CHANNELS\` permission to run this command`)
    .setColor(`E6E6FA`)

    return message.channel.send(noPermis)
    }
    }
}