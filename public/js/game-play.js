const setupMovieClick = () => {
    const movies = document.querySelectorAll('.movie')
    movies.forEach(elm => {
        elm.addEventListener('click', function (event) {
            const clickedMovieId = event.currentTarget.querySelector('input').value
            //countStep()
            setNewCurrentObject(clickedMovieId)
            //isEndActorHere()
        })
    })
}

const setNewCurrentObject = movieId => {
    axios
        //.get(`http://localhost:3000/game/fullcast/${movieId}`)
        .get(`https://spicy-bacon-jw.herokuapp.com/game/fullcast/${movieId}`)
        .then(response => {
            let cast = response.data
            //updateProgressBar(response)
            updateCastList(cast)
        })
}

const updateCastList = cast => {
    listSpace = document.querySelector('#lists-space')
    listSpace.querySelector('#movies-div').setAttribute('class', 'inactive')
    listSpace.querySelector('#cast-div').setAttribute('class', 'active')

    listSpace.querySelector('#movieTitle-space').innerText = cast.title
    cast.actorList.forEach(elm => {
        listSpace.querySelector('#cast-list').appendChild(createListedActor(elm))
    })
}