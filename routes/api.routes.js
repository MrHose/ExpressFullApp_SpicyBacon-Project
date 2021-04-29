const express = require('express')
const router = express.Router()

const IMDbApp = require('../services/api-handler')
const IMDb = new IMDbApp


//Search Actors
router.get('/actor/:actorName', (req, res) => {

    const { actorName } = req.params

    IMDb
        .searchActors(actorName)
        .then(actorsFound => res.json(actorsFound.data.results))
        .catch(err => res.json(err))
})


//Get an actor's filmography
router.get('/filmography/:actorId', (req, res) => {

    const { actorId } = req.params

    IMDb
        .getActorById(actorId)
        .then(actorFound => {
            const { id, name, image } = actorFound.data
            const mainTitles = actorFound.data.knownFor
            const allTitles = actorFound.data.castMovies.filter(elm => elm.role === "Actor" || elm.role === "Actress")
            res.json({ id, name, image, mainTitles, allTitles })
        })
        .catch(err => res.json(err))
})


//Get a movie's cast
router.get('/fullcast/:movieId', (req, res) => {

    const { movieId } = req.params

    IMDb
        .getMovieById(movieId)
        .then(movieFound => {
            const { id, title, image, actorList } = movieFound.data
            res.json({ id, title, image, actorList })
        })
        .catch(err => res.json(err))
})


//Get a random actor
router.get('/randomActor', (req, res) => {
    
    IMDb
        .getMostPopularMovies()
        .then(movies => {
            const moviesArray = movies.data.items
            const singleActors = moviesArray.map(elm => {
                crewString = elm.crew
                singleActor = crewString.split(',')
                return singleActor[1].trim()
            })
            res.json(singleActors)
        })
        .catch(err => res.json(err))
})



module.exports = router