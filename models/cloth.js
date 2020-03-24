const mongoose = require("mongoose");

const clothSchema = mongoose.Schema({
    name: String,
    image: String,
    price: String,
    size: [
        {
            type: String
        }
    ],
    category: String
});

module.exports = mongoose.model('Cloth', clothSchema);