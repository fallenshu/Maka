const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
    Prefix: {
        type: String,
        default: "*"
    },
    GuildID: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Prefixs', prefixSchema)