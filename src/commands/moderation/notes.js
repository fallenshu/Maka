const noteSchema = require('../../models/note')
// **${message.author.username}**,
const Discord = require('discord.js')
const { m } = require('../../config.json')
module.exports ={
    name: 'notes',
    desc: 'Display all notes for a user',
    category: 'Moderation',
    async execute(message, client, args, p ) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

            noteSchema.find({GuildID: message.guild.id, UserID: user.id}, async(err, data) => {
                if(err) console.log(err)

                const av = message.guild.members.cache.get(user.id).user.displayAvatarURL()

                const embed = new Discord.MessageEmbed()
                .setAuthor( `Notes for ${message.guild.members.cache.get(user.id).user.tag}`, av)
                .setDescription(`${data.map(d=>{
                    return d.Notes.map((n, i)=>
                    `ID: \`${n.noteID}\` • Note author: **${n.Author}**
                    **${n.Note}**\n\n`).join(" ")
                })}`)
                .setColor(m)
                 message.channel.send(embed)
            })
        } else {
            return message.channel.send(`**${message.author.username}**, You are missing the \`ADMINISTRATOR\` permission that is needed to run this command.`)
        }
    }
}

