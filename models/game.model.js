// Game model development
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gameSchema = new Schema({
    score: Number,
    startActorId: String,
    endActorId: String,
    completedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Game = mongoose.model("Game", gameSchema)

module.exports = Game