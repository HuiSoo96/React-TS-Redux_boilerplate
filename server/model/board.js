const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const BoardSchema = mongoose.Schema({
    ObejctId: {
        type: String,
        require: true,
    },
    nickname: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        maxlength: 50,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    class: {
        type: String,
        require: true,
    },
    tag: {
        type: [],
        require: true
    }
})

const Board = mongoose.model('Board', BoardSchema)

module.exports = Board