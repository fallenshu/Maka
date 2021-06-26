const prefixSchema = require('../models/prefix')
module.exports = {
    name: "guildDelete",
    async execute(guild,client) {
        const newData = await prefixSchema.findOneAndRemove({
                GuildID: guild.id,
        })
        console.log(`Deleted data for guild ${guild.name}`)
    }
}