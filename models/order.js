const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    clothname: String,
    isWaiting: {type: Boolean, default: true},
    isDone: {type: Boolean, default: false},
    isCancelled: {type: Boolean, default: false}
});

module.exports = mongoose.model('Order', orderSchema);