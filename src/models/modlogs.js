const { model , Schema} = require("mongoose")


const ModLogsSchema = new Schema({
    GuildID: {
        type: String,
    },
    ChannelID: {
        type: String,
    }
})

module.exports = new model('ModLogs', ModLogsSchema)