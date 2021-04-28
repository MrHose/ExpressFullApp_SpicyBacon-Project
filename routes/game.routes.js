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

router.get('/begin', (req, res) => {
    startActorId = req.query.startActorId
    endActorId = req.query.endActorId
    scoreToBeat = req.query.scoreToBeat
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
            //return axios.get(`http://localhost:3000/game/filmography/${startActor.id}`)
            return axios.get(`https://spicy-bacon-jw.herokuapp.com/game/filmography/${startActor.id}`)
        })
        .then(actorFound => {
            currentObject = actorFound.data
            res.render('pages/game/playArea', { startActor, endActor, scoreToBeat, currentObject } )
        })
        .catch(err => console.log(err))
})

const urlStart = 'https://imdb-api.com/en/API/'
const IMDbAPI_Key = process.env.IMDbAPI_Key

//Testing
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

//Get specific movie fullcast by ID
router.post('/movie/fullCast', isLoggedIn, (req, res) => {
    const movieId = req.body.movieId
    const searchTerm = movieId
    const action = 'FullCast'
    const options = ''
    const fullUrl = `${urlStart}${action}/${IMDbAPI_Key}/${searchTerm}/${options}`
    res.redirect(fullUrl)
})

module.exports = router