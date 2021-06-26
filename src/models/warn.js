const mongoose = require("mongoose")

const warnSchema = new mongoose.Schema({
    GuildID: {
        type: String,
    },
    Warns: {
        type: Array
    },
    UserID: {
        type: String,
    }
})

const wSchema = module.exports = mongoose.model('Warns', warnSchema)