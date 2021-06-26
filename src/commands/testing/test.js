
module.exports = {
    name: 'test',
    desc: 'Tets  commands',
    category: 'Testing',
    usage: 'test',
    example: 'test',
    aliases: ['pp','ppp'],
    ownerOnly: true,
    async execute(message, client, args) {
        message.reply(`PP`)
    }
}