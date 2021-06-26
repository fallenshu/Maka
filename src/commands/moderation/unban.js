const Discord = require('discord.js')
const { m } = require('../../config.json')
const main = m

module.exports = {
    name: 'unban',
    desc: 'unbans a user from the current server!',
    category: 'Moderation',
    async execute(message, client, args, p) {

        if(message.member.hasPermission('BAN_MEMBERS')) {
            const user = args[0]

            if(user) {
                const member = args[0]
                let reason = args.slice(1).join(' ') || "No reason provided."
                if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

                if(member) {
                    await message.guild.members.unban(args[0], {reason: `${reason}` })
                    .then(() => {
  
                        message.channel.send(`Unbanned \`${args[0]}\`.`)
                    })
                    .catch(err => {
                        console.log(err)
                        message.channel.send(`Error occured unbanning this user!`)
                    })
                } else {
     

                    return message.channel.send(`**${message.author.username}**, That user is not banned in the server.`)
                }
            } else {
 

                return message.channel.send(`**${message.author.username}**, Please mention a user ID that you would like to unban`)
            }
        } else {
            return message.channel.send(`**${message.author.username}**, You are missing the \`BAN_MEMBERS\` permission that is needed to run this command.`)
        }
    }
}