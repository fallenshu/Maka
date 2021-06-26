const mongoose = require('mongoose');

const AFKSchema = new mongoose.Schema({
	UserID: {
        type: String,
    },
	Reason: {
        type: String
    } 
});

const MessageModel = module.exports = mongoose.model('Afk', AFKSchema);