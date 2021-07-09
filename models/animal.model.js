const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/config');

const animalSchema = new Schema({
    name: { type: String, required: true },
    group: { type: String, },
    description: { type: String, },
    links: [{
        types: { type: String, },
        url: { type: String },
    }],
    level: { type: Number, },
    evaluation: [{
        type: String,
        ref: config.mongodb.collections.user
    }],
    comments: [{
        body: { type: String },
        user: {
            type: String,
            ref: config.mongodb.collections.user
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    active: { type: Boolean, default: true }
});

module.exports = global.mongoConnection.model(config.mongodb.collections.animal, animalSchema);