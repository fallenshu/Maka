const mongoose = require("mongoose")

const muteSchema = new mongoose.Schema({
    MutedRole: {
        type: String,
    },
    NormalRole: {
        type: String,
    },
    GuildID: {
        type: String,
    },
})

const mSchema = module.exports = mongoose.model('MuteInfo', muteSchema)