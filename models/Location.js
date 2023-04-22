const {Schema, model} = require('mongoose');

const locationSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    type: String,
    dimension: String,
    residents:[{
        type: String,
        ref: 'Character'
    }],
    created: String
})

module.exports = model('Location', locationSchema);
