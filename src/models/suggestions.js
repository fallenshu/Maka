const { Schema, model } = require("mongoose");

const suggestionsSchema = new Schema({
    ChannelID: {
        type: String,
    },
    GuildID: {
        type: String,
    }
})

module.exports = new model('SuggestionsChannels', suggestionsSchema)