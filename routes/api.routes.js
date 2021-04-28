const express = require('express')
const router = express.Router()

const IMDbApp = require('../services/api-handler')
const IMDb = new IMDbApp

//Search Actors
router.get('/actor/:actorName', (req, res) => {
    actorToSearch = req.params.actorName
    IMDb
        .searchActors(actorToSearch)
        .then(actorsFound => res.json(actorsFound.data.results))
        .catch(err => res.json(err))
})

//Get an actor's filmography
router.get('/filmography/:actorId', (req, res) => {
    actorId = req.params.actorId
    IMDb
        .getActorById(actorId)
        .then(actorFound => {
            res.json(titles = {
                id: actorFound.data.id,
                name: actorFound.data.name,
                image: actorFound.data.image,
                mainTitles: actorFound.data.knownFor,
                allTitles: actorFound.data.castMovies.filter(elm => elm.role === "Actor" || elm.role === "Actress")
            })
        })
        .catch(err => res.json(err))
})

//Get a movie's cast
router.get('/fullcast/:movieId', (req, res) => {
    movieId = req.params.movieId
    IMDb
        .getMovieById(movieId)
        .then(movieFound => {
            res.json(cast = {
                id: movieFound.data.id,
                title: movieFound.data.title,
                image: movieFound.data.image,
                actorList: movieFound.data.actorList
            })
        })
        .catch(err => res.json(err))
})

module.exports = router



// game/filmography/nm0000102