const { Schema, model } = require('mongoose')

const welcomeSchema = new Schema({
    ChannelID: {
        type: String,
    },
    Txt: {
        type: String,
    },
    GuildID: String,
})

module.exports = new model('WelcomeMessages', welcomeSchema)