// Made by naaaah#0944

const userTickets = new Map();
const accept = '<a:greenswirl:834495278949859328>'
const decline = '<a:redswirl:834495278844870676>'
const { m } = require('../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'directMessage', //I made it a custom event and then i emit it if a message is sent in DMs.
    async execute(message, client) {
        if (message.author.bot) return;
        if (!userTickets.has(message.author.id)) {
            await message.react('✅')
            const sentEmbed = new MessageEmbed()
                .setTitle(`Mod mail sent!`)
                .setDescription('Your message has been sent to the developer. Please wait for him to respond')
                .setColor(m)
            message.channel.send(sentEmbed)
            userTickets.set(message.author.id, message.guild);

            //Getting the guild id.
            const guildID = client.guilds.cache.get('GUILD ID')
            const channel = await guildID.channels.create(`modmail: ${message.author.tag}`); 
            channel.setParent("CATEGORY ID HERE.")
            
            if (channel) {
                const embed = new MessageEmbed()
                    .setTitle('New ModMail Message')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(message.content)
                    .setColor('#E6E6FA')
                const msg = await channel.send(embed)

                await msg.react(accept);
                await msg.react(decline)

                try {
                    const reactionFilter = (reaction, user) => [accept, decline].includes(reaction.emoji.id) && !user.bot;
                    const reactions = await msg.awaitReactions(reactionFilter, { max: 1, time: 36e+6, errors: ['time'] });
                    const choice = reactions.get(accept) || reactions.get(decline);
                    if (choice.emoji.id === accept) {
                        channel.send(`Modmail accpeted.`)
                        await handlerCollectors(channel, message);
                        userTickets.delete(message.author.id)
                    } else if (choice.emoji.id === decline) {
                        channel.delete();
                        message.author.send('Your message has been rejected. You may try again in 30 seconds.');
                        setTimeout(() => {
                            userTickets.delete(message.author.id);
                        }, 30000)
                    }
                } catch (err) {
                    console.log(err)
                    message.author.send('No one was available to accept your query. Please contact the staff again.');
                    userTickets.delete(message.author.id)
                }
            } else {
                message.channel.send('**Oh oh...** something went wrong. Please contact a staff member.')
                userTickets.delete(message.author.id)
            }
        }
    },
};

function handlerCollectors(channel, message) {
    const filter = m => m.author.id === message.author.id;
    const guildChannelCollectorFilter = m => m.channel.id === channel.id && !m.author.bot
    const dmCollector = message.channel.createMessageCollector(filter);
    const guildChannelCollector = channel.createMessageCollector(guildChannelCollectorFilter)
    return new Promise((resolve, reject) => {
        dmCollector.on('collect', async m => {
            await m.react('✅')
            const sentEmbed = new MessageEmbed()
                .setTitle(`New ModMail Message`)
                .setAuthor(m.author.tag, m.author.displayAvatarURL())
                .setDescription(`${m.content}`)
                .setColor('#E6E6FA')
            channel.send(sentEmbed)
        });
        guildChannelCollector.on('collect', async m => {
            if (m.content.toLowerCase() === '*close') {
                guildChannelCollector.stop();
                dmCollector.stop();
                resolve();
                await m.react('✅')
                const closedEmbed = new MessageEmbed()
                .setTitle(`ModMail Closed`)
                .setDescription(`This ModMail thread has been closed by ${m.author}.`)
                .setFooter('Replying will create a new ModMail thread.')
                .setColor('#E6E6FA')
            message.channel.send(closedEmbed);
            await channel.delete();
            } else {
                await m.react('✅')
                const sentFromChannelEmbed = new MessageEmbed()
                    .setTitle(`New ModMail Message`)
                    .setAuthor(m.author.tag, m.author.displayAvatarURL())
                    .setDescription(`${m.content}`)
                    .setColor('#E6E6FA')
                message.channel.send(sentFromChannelEmbed)
            }
        })
    })
}