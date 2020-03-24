var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    firstName: String,
    lastName: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);