const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    birth_date: { type: Date, default: Date.now },
    description: { type: String },
    location: {
        city: { type: String },
        district: { type: String },
        country: { type: String }
    },
    active: { type: Boolean, default: true },
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema)