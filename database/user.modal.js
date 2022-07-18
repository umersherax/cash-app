const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    uniqueId : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
    }
},
{
    collection: 'user-data'
}
);

const modal = mongoose.model('UserData', User);

module.exports = modal;
