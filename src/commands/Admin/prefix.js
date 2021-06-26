const prefixSchema = require('../../models/prefix')
const { MessageEmbed } = require('discord.js')
const { m } = require('../../config.json')

module.exports = {
    name: 'prefix',
    desc: 'Set / remove the custom prefix',
    usage: 'prefix add <prefix> | prefix remove',
    example: 'prefix add ! | prefix remove',
    category: 'Administrator',
    async execute(message, client, args, p) {

        const data = await prefixSchema.findOne({GuildID: message.guild.id})
        const noArgsLength = new MessageEmbed()
        .setAuthor(`Prefix Command`)
        .setDescription(`
        \`${data.Prefix}prefix add <newprefix> :\` Add a new custom prefix
        \`${data.Prefix}prefix remove          :\` Reset the custom prefix`)
        .setColor(m)

        if(!args.length) {
            return message.channel.send(noArgsLength)
        }


        if(args[0].toLowerCase() == 'add') {
            const newPrefix = args[1]
            if(!newPrefix) {
                return message.channel.send(`**${message.author.username}**, Please supply a new prefix! • (E.G) \`${data.Prefix}prefix add !\` `)
            }

            if(data) {
                try {
                await prefixSchema.findOneAndRemove({
                    GuildID: message.guild.id
                })

                const newData = new prefixSchema({
                    GuildID: message.guild.id,
                    Prefix: newPrefix
                })

                newData.save()
                .then(() => {
                    message.channel.send(`**${message.author.username}**, Set prefix to \`${newPrefix}\``)
                });
            } catch (err) {
                message.channel.send(`**${message.author.username}**, Error occured. This has been reported to the developer`)
                console.log(err)
            }
            } else if(!data) {
                try {
                const newData = new prefixSchema({
                    GuildID: message.guild.id,
                    Prefix: newPrefix
                })

                newData.save()
                .then(() => {
                    message.channel.send(`**${message.author.username}**, Updated prefix to \`${newPrefix}\``)
                });
            } catch (err) {
                message.channel.send(`**${message.author.username}**, Error occured. This has been reported to the developer`)
                console.log(err)
            }
            }
        }

        if(args[0].toLowerCase() == 'remove') {
            if(data) {
                await prefixSchema.findOneAndUpdate({
                    Prefix: '*'
                }).then(() => {
                    message.channel.send(`**${message.author.username}**, i have reset your prefix`)
                })
            } else if(!data) {
                message.channel.send(`**${message.author.username}**, There was no data found for this server!`)
            }
        }
    }
}