// User model development
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    challenges: [{
        from: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        game: {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }
    }],
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User