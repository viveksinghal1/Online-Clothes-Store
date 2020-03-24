const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    clothID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cloth'
    },
    isWaiting: {type: Boolean, default: true},
    isDone: {type: Boolean, default: false},
    isCancelled: {type: Boolean, default: false}
});