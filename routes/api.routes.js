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

module.exports = router