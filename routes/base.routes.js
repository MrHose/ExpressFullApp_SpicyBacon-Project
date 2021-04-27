const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')

const Game = require('./../models/game.model')

// Endpoints
router.get('/', (req, res) => {
    res.render('pages/index')
})

module.exports = router

