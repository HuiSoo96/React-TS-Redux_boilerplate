const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        maxlength: 15,
    },
    password: {
        type: String,
        minlength: 8
    },
    nickname: {
        type: String,
        minlength: 2,
        maxlength: 8,
        unique: true,
    },
    address: {
        type: String
    },
    cellNumber: {
        type: String,
    },
    gerder: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Number,
    },
    isSNS: {
        type: String,
        default: 'NOTSNS'
    }
})

UserSchema.methods.generateHash = function(pw) {
    let mongobcrypt = bcrypt;
    let salt = mongobcrypt.genSaltSync(10);

    return bcrypt.hashSync(pw, salt, null);
};

UserSchema.methods.validPassword = function(pw) {
    let mongobcrypt = bcrypt;
    return mongobcrypt.compareSync(pw, this.UserPw);
}

const User = mongoose.model('User', UserSchema)

module.exports = User