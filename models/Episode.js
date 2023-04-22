const {Schema, model} = require('mongoose');

const episodeSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    air_date: String,
    episode: String,
    characters:[{
        type: Schema.Types.ObjectId,
        ref: 'Character'
    }],
    created: String
})

module.exports = model('Episode', episodeSchema);