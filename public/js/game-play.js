//For movies list
const setupMovieClick = () => {
    const movies = document.querySelectorAll('.movie')
    movies.forEach(elm => {
        elm.addEventListener('click', function (event) {
            const clickedMovieId = event.currentTarget.querySelector('input').value
            setNewCurrentMovie(clickedMovieId)
        })
    })
}


const setNewCurrentMovie = (movieId) => {
    axios
        .get(`${myAPIurl}/game/fullcast/${movieId}`)
        .then(response => {
            let cast = response.data
            progressBar.addStep('movie', cast)
            updateCastList(cast)
        })
        .then(() => {
            setupActorClick()
        })
        .catch(err => console.log(err))
}


const updateCastList = cast => {
    const listSpace = document.querySelector('#lists-space')
    listSpace.querySelector('#movies-div').setAttribute('class', 'inactive')
    listSpace.querySelector('#cast-div').setAttribute('class', 'active')

    listSpace.querySelector('#movieTitle-space').innerText = cast.title

    listSpace.querySelector('#cast-list').innerHTML = ''
    cast.actorList.forEach(elm => {
        listSpace.querySelector('#cast-list').appendChild(createListedActor(elm))
    })
}


//For actors list
const setupActorClick = () => {
    const actor = document.querySelectorAll('.actor')
    actor.forEach(elm => {
        elm.addEventListener('click', function (event) {
            const clickedActorId = event.currentTarget.querySelector('input').value
            setNewCurrentActor(clickedActorId)
        })
    })
}


const setNewCurrentActor = (actorId) => {
    axios
        .get(`${myAPIurl}/game/filmography/${actorId}`)
        .then(response => {
            let filmography = response.data
            progressBar.addStep('actor', filmography)
            updateMovieList(filmography)
        })
        .then(() => {
            setupMovieClick()
        })
        .catch(err => console.log(err))
}

const updateMovieList = movies => {
    const listSpace = document.querySelector('#lists-space')
    listSpace.querySelector('#cast-div').setAttribute('class', 'inactive')
    listSpace.querySelector('#movies-div').setAttribute('class', 'active')

    listSpace.querySelector('#actorName-space').innerText = movies.name

    listSpace.querySelector('#main-list').innerHTML = ''
    movies.mainTitles.forEach(elm => {
        listSpace.querySelector('#main-list').appendChild(createMainListedMovie(elm))
    })

    listSpace.querySelector('#all-list').innerHTML = ''
    movies.allTitles.forEach(elm => {
        listSpace.querySelector('#all-list').appendChild(createAllListedMovie(elm))
    })
}