const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')

const IMDbApp = require('../services/api-handler')
const { default: axios } = require('axios')
const IMDb = new IMDbApp


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



//Testing-----------
const urlStart = 'https://imdb-api.com/en/API/'
const IMDbAPI_Key = process.env.IMDbAPI_Key
router.get('/test', (req, res) => {
    res.render('pages/game/test')
})
//Search Actors
router.post('/actor', isLoggedIn, (req, res) => {
    const actorToSearch = req.body.name
    const searchTerm = actorToSearch
    const action = 'SearchName'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})
//Search Movies
router.post('/movie', isLoggedIn, (req, res) => {
    const movieToSearch = req.body.name
    const searchTerm = movieToSearch
    const action = 'SearchMovie'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})
//Get specific actor by ID
router.post('/actor/byId', isLoggedIn, (req, res) => {
    const actorId = req.body.actorId
    const searchTerm = actorId
    const action = 'Name'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})
//Get specific movie by ID
router.post('/movie/byId/', isLoggedIn, (req, res) => {
    const movieId = req.body.movieId
    const searchTerm = movieId
    const action = 'Title'
    const options = 'FullCast'
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect('fullUrl')
})
//Testing END----------


module.exports = router