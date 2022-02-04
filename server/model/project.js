const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    title: String,
    content: String,
    views: Number,
    date: Date,
    price: Number,
})

UserSchema.methods.generateHash = function(pw) {
    let mongobcrypt = bcrypt;
    let salt = mongobcrypt.genSaltSync(10);

    return bcrypt.hashSync(pw, salt, null);
};

const COLLAB = mongoose.model('COLLAB', UserSchema)

module.exports = COLLAB