const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/config');

const expertSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    birth_date: { type: Date, default: Date.now },
    description: { type: String },
    location: {
        city: { type: String },
        district: { type: String },
        country: { type: String }
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true }
});

module.exports = global.mongoConnection.model(config.mongodb.collections.expert, expertSchema);