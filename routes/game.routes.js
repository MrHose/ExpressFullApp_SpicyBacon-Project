const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')

const IMDbApp = require('../services/api-handler')
const { default: axios } = require('axios')
const IMDb = new IMDbApp

const User = require('./../models/user.model')
const Game = require('./../models/game.model')

//Game preparation
router.get('/', isLoggedIn, (req, res) => {
    res.render('pages/game/index')
})


//Game begin
router.get('/begin', (req, res) => {

    const { startActorId, endActorId, scoreToBeat } = req.query
    let startActor = ''
    let endActor = ''
    let currentObject = ''

    IMDb
        .getActorById(startActorId)
        .then(startResponse => {
            startActor = startResponse.data
            return IMDb.getActorById(endActorId)
        })
        .then(endResponse => {
            endActor = endResponse.data
            return axios.get(`${process.env.SRC_URI}/game/filmography/${startActorId}`)
        })
        .then(actorFound => {
            currentObject = actorFound.data
            res.render('pages/game/playArea', { startActor, endActor, scoreToBeat, currentObject } )
        })
        .catch(err => console.log(err))
})

//Save won game
router.get('/save', (req, res) => {
    const { startActorId, endActorId} = req.query
    const score = parseInt(req.query.score, 10)

    const completedBy = req.session.currentUser._id

    const createdGame = ''

    Game
        .create({ startActorId, endActorId, score, completedBy })
        .then(response => {
            const { id } = response
            return User.findByIdAndUpdate(completedBy, { $push: { history: id }})
        })
        .then(updatedUser => {
            res.redirect('/user/')
        })
        .catch(err => console.log(err))
})


module.exports = router