const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    GuildID: {
        type: String,
    },
    Notes: {
        type: Array
    },
    UserID: {
        type: String,
    }
})

const wSchema = module.exports = mongoose.model('Notes', noteSchema)