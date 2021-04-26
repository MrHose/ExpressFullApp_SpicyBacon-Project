const express = require('express')
const router = express.Router()

const IMDbApp = require('../services/api-handler')
const IMDb = new IMDbApp

//Search Actors
router.post('/actor/', (req, res) => {
    const actorToSearch = req.body.name
    const side = req.body.side
    IMDb
        .searchActors(actorToSearch)
        .then(response => {
            const { data } = response
            console.log({
                side: side,
                searchResults: data.results
            })
            res.render('pages/game/index', {
                side: side,
                searchResults: data.results
            })
        })
        .catch(err => console.timeLog(err))
})



const IMDbAPI_Key = process.env.IMDbAPI_Key
const urlStart = 'https://imdb-api.com/en/API/'

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
router.post('/movie/fullCast', (req, res) => {
    const movieId = req.body.movieId
    const searchTerm = movieId
    const action = 'FullCast'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})

module.exports = router