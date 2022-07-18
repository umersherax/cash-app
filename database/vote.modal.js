const mongoose = require('mongoose');

const Vote = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    voteFor: {
        type: String,
        required: true
    }
},
{
    collection: 'vote-data'
}
);

const modal = mongoose.model('VoteData', Vote);

module.exports = modal;
