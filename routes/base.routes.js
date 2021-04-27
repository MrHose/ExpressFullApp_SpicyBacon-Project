const express = require('express')
const router = express.Router()

const Game = require('./../models/game.model')

// Endpoints
router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/auth', (req, res) => {
    res.render('pages/auth/index')
})

router.get('/game', (req, res) => {
    Game
        .create()
        .then(createdGame => {
            res.render('pages/game/index', createdGame)
        })
        .catch(err => console.log('error', err))
})

module.exports = router

