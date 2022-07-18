const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    message : {
        type: Array,
        required: true,
        timestamps: true
    },
    sender: {
        type: String,
    },
    receiver: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
},
{
    collection: 'chat-data'
},

);

const modal = mongoose.model('ChatData', Chat);

module.exports = modal;
