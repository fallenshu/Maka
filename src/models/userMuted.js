const mongoose = require("mongoose")

const muteSchema = new mongoose.Schema({
    UserID: {
        type: String
    },
})

const mSchema = module.exports = mongoose.model('Muteed-Users', muteSchema)