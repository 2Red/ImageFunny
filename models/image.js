const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    path: String,
    category: String,
    search_key: String
});

module.exports = mongoose.model('ImageObj', imageSchema);