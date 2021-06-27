const { model, Schema } = require('mongoose')

const newsSchema = new Schema({
    news: {
        type: String,
        default: 'No new news / updates'
    },
    ClientID: {
        type: String
    }
})

module.exports = model('News', newsSchema)