const warnSchema = require('../../models/warn')
const Discord = require('discord.js')
const { m } = require('../../config.json')
const main = m


module.exports = {
    name: 'warns',
    aliases: ['warnings' , 'infractions'],
    desc: 'List a users warnings',
    usage: 'warnings <user>',
    category: 'Moderation',
    async execute(message, client, args, p) {
        
        if(message.member.hasPermission('KICK_MEMBERS')) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

          warnSchema.find({GuildID: message.guild.id, UserID: user.id},async(err, data) => {
            if(err) console.log(err)
            if(!data) { // does not work :<
                return message.channel.send(`**${message.author.username}**, The mentioned user doesnt have any warns.`)
            };

            const av = message.guild.members.cache.get(user.id).user.displayAvatarURL()
            const embed = new Discord.MessageEmbed()
            .setAuthor( `Warnings for ${message.guild.members.cache.get(user.id).user.tag}`, av)
            .setDescription(`${data.map(d=>{
                return d.Warns.map((w, i)=>
                `> ID: \`${w.WarnID}\`
                > **${w.Reason}**\n\n`).join(" ")
            })}`)
            .setColor(main)
             message.channel.send(embed)



        })

    } else {
        return message.channel.send(`**${message.author.username}**, You are missing the \`KICK_MEMBERS\` permission that is needed to run this command.`)
    }
    }
}
