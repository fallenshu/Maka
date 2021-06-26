const ms = require('ms')
const Discord = require('discord.js')
const main = 'E6E6FA'
const muteSchema = require('../../../models/userMuted')
const mschema = require('../../../models/mute')


module.exports = {
    name: 'mute',
    aliases: ['silence'],
    desc: 'Permently / time mute a user!',
    category: 'Moderation',
    disabled: true,
    async execute(message, client, args) {

       
        if(message.member.hasPermission('KICK_MEMBERS')) {
            const d = await mschema.findOne({
                GuildID: message.guild.id
            })

            if(d) {
                message.delete({ timeout: 100 })
        
                const target = message.mentions.users.first() ||  message.client.users.cache.get(args[0])
                
                const data = await muteSchema.findOne({
                    UserID: target.id
                })
        
                if(target) {

                    const member = message.guild.member(target)
                    if (member.roles.highest.position >= message.guild.me.roles.highest.position)
                     return message.channel.send(`**${message.author.username}**, Cant mute user that has a higher role than your or has the same role as you.`)
                    if (member.roles.highest.position >= message.member.roles.highest.position) 
                    return message.channel.send(`**${message.author.username}**, Cant mute user that has a higher role than me or has the same role as me.`)
                const user = message.guild.members.cache.get(target.id)
        
        
                
        
        
                if(!args[1]) {
                    user.roles.add(d.MutedRole)
                    user.roles.remove(d.NormalRole)
                    
                    const embed2 = new Discord.MessageEmbed()
                    .setAuthor(`Muted Member.`)
                    .setDescription(`Permanently muted user`)
                    .setColor(main)
        
                    message.channel.send(embed2)
        
                    
                if(data) {
                    return;
        
                } else if(!data) {
                    const newData = new muteSchema({
                        UserID: target.id,
                    })
        
                    newData.save()
                }
                
                };
        
        
                if(args[1]) {
                    
                    user.roles.add(d.MutedRole)
                    user.roles.remove(d.NormalRole)
        
                const embed = new Discord.MessageEmbed()
                .setAuthor(`Muted Member.`)
                .setDescription(`Muted member for ${args[1]}`)
                .setColor(main)
                message.channel.send(embed)
        
                
                if(data) {
                    return;
                } else if(!data) {
                    const newData = new muteSchema({
                        UserID: target.id,
                    })
        
                    newData.save()
                }
                
        
                setTimeout(async () => {
        
        
        
                    user.roles.remove(d.MutedRole)
                    user.roles.add(d.NormalRole)
        
                   await muteSchema.findOneAndRemove({
                       UserID: target.id
                   })
                }, ms(args[1]));
                }
        
                }
        
                
              
            } else if(!d) {
                const noD = new Discord.MessageEmbed()
                .setAuthor(`No data found!`)
                .setDescription(`Please setup a muted role and a normal role \`muteconfig\``)
                .setColor(main)

                return message.channel.send(noD)
            }


    } else {
        const noPermis = new Discord.MessageEmbed()
        .setAuthor(`Incorrect Permission`)
        .setDescription(`You do not have the right permissions to run this command!`)
        .setColor(main)
    
        return message.channel.send(noPermis)
    }
} 
}
