const mongoose = require('mongoose');

const AFKSchema = new mongoose.Schema({
    UserN : { type: String},
	UserID: {
        type: String,
    },
	Reason: {
        type: String
    } 
});

const MessageModel = module.exports = mongoose.model('AfkUsers', AFKSchema);