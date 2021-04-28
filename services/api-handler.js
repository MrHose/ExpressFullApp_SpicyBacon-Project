const axios = require('axios')

const IMDbAPI_Key = process.env.IMDbAPI_Key

class IMDbApp {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://imdb-api.com/en/API/'
        })
    }
    searchActors = actorToSearch => this.api.get(`/SearchName/${IMDbAPI_Key}/${actorToSearch}`)
    searchMovies = movieToSearch => this.api.get(`/SearchMovie/${IMDbAPI_Key}/${movieToSearch}`)

    getActorById = actorId => this.api.get(`/Name/${IMDbAPI_Key}/${actorId}`)
    getMovieById = movieId => this.api.get(`/Title/${IMDbAPI_Key}/${movieId}`)

    getMostPopularMovies = () => this.api.get(`/MostPopularMovies/${IMDbAPI_Key}`)
}

module.exports = IMDbApp