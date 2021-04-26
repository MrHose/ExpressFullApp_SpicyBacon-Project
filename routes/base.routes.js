const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/auth', (req, res) => {
    res.render('pages/auth/index')
})

router.get('/game', (req, res) => {
    res.render('pages/game/index')
})

module.exports = router

