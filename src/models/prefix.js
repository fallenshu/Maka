const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
    GuildID: {
        type: String,
    },
    Prefix: {
        type: String,
        default: "*"
    },
})

module.exports = mongoose.model('Prefixs', prefixSchema)