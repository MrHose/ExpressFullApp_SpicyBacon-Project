const express = require('express')
const router = express.Router()

const IMDbApp = require('../services/api-handler')
const IMDb = new IMDbApp

const Game = require('./../models/game.model')

//Variable global
let totalGameSearchResults = {
    start: [],
    end: []
}

//Search Actors
router.post('/actor', (req, res) => {
    const actorToSearch = req.body.name
    const side = req.body.side
    IMDb
        .searchActors(actorToSearch)
        .then(response => {
            const { data } = response
            switch (side) {
                case 'start':
                    totalGameSearchResults.start = data.results
                    break
                case 'end':
                    totalGameSearchResults.end = data.results
                    break
            }
            res.render('pages/game/index', totalGameSearchResults)
        })
        .catch(err => console.timeLog(err))
})

//
router.get('/actor/:actorId/:side', (req, res) => {
    const actorId = req.params.actorId
    const side = req.params.side
    console.log(totalGameSearchResults)
    IMDb
        .getActorById(actorId)
        .then(response => {
            const {
                data
            } = response
            switch (side) {
                case 'start':
                    Game
                        .create({ startActorId: actorId })
                        .then(createdGame => {
                            console.log(createdGame)
                        })
                    break
                case 'end':
                    Game
                        .create({ endActorId: actorId })
                        .then(createdGame => {
                            console.log(createdGame)
                        })
                    break
            }
            res.render('pages/game/index', totalGameSearchResults)
        })
        .catch(err => console.timeLog(err))
})

//Search Movies
router.post('/movie', (req, res) => {
    const movieToSearch = req.body.name
    const searchTerm = movieToSearch
    const action = 'SearchMovie'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})

//Get specific actor by ID
router.post('/actor/byId', (req, res) => {
    const actorId = req.body.actorId
    const searchTerm = actorId
    const action = 'Name'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})

//Get specific movie by ID
router.post('/movie/byId/', (req, res) => {
    const movieId = req.body.movieId
    const searchTerm = movieId
    const action = 'Title'
    const options = 'FullCast'
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect('fullUrl')
})

//Get specific movie fullcast by ID
// router.post('/movie/fullCast', (req, res) => {
//     const movieId = req.body.movieId
//     const searchTerm = movieId
//     const action = 'FullCast'
//     const options = ''
//     const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
//     res.redirect(fullUrl)
// })

module.exports = router