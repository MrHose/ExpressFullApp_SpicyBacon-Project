const createSearchResult = (searchResult, side) => {
    return (
        `<hr>
  <li class="search-result result-${side}">
  <span hidden>${searchResult.id}</span>
  <img src="${searchResult.image}" alt="${searchResult.title}-profile-picture" class="searc-result-img">
  <h4>${searchResult.title}</h4>
  </li>`
    )
}

function createButton(scoreToBeat) {
    const startActorId = document.querySelector('#start-actorId').value
    const endActorId = document.querySelector('#end-actorId').value

    const beginButton = document.createElement('a')
    beginButton.setAttribute('href', `/game/begin?startActorId=${startActorId}&endActorId=${endActorId}&scoreToBeat=${scoreToBeat}`)
    beginButton.innerHTML = `<button id="begin-button">Begin Game</button>`
    document.querySelector('#begin-button-space').innerHTML = beginButton.outerHTML
}

const createListedActor = actor => {
    const listedActorIMG = document.createElement('img')
    listedActorIMG.setAttribute('src', actor.image)
    listedActorIMG.setAttribute('alt', `${actor.name}-profile-picture`)

    const listedActorFIGCAPTION = document.createElement('figcaption')
    listedActorFIGCAPTION.innerHTML = `<b><b>${actor.name}</b></b></br><span>as ${actor.asCharacter}</span>`

    const listedActorFIGURE = document.createElement('figure')
    listedActorFIGURE.appendChild(listedActorIMG)
    listedActorFIGURE.appendChild(listedActorFIGCAPTION)

    const listedActorINPUT = document.createElement('input')
    listedActorINPUT.hidden = true
    listedActorINPUT.setAttribute('type', 'text')
    listedActorINPUT.setAttribute('value', `${actor.id}`)

    const listedActorLI = document.createElement('li')
    listedActorLI.setAttribute('class', 'listed-actor actor')
    listedActorLI.appendChild(listedActorFIGURE)
    listedActorLI.appendChild(listedActorINPUT)

    return listedActorLI
}

const createMainListedMovie = movie => {
    const mainListedMovieIMG = document.createElement('img')
    mainListedMovieIMG.setAttribute('src', movie.image)
    mainListedMovieIMG.setAttribute('alt', `${movie.title}-poster`)

    const mainListedMovieFIGCAPTION = document.createElement('figcaption')
    mainListedMovieFIGCAPTION.innerHTML = `<b><b>${movie.title}</b></b>`

    const mainListedMovieFIGURE = document.createElement('figure')
    mainListedMovieFIGURE.appendChild(mainListedMovieIMG)
    mainListedMovieFIGURE.appendChild(mainListedMovieFIGCAPTION)

    const mainListedMovieINPUT = document.createElement('input')
    mainListedMovieINPUT.hidden = true
    mainListedMovieINPUT.setAttribute('type', 'text')
    mainListedMovieINPUT.setAttribute('value', `${movie.id}`)

    const mainListedMovieLI = document.createElement('li')
    mainListedMovieLI.setAttribute('class', 'listed-movie-poster movie')
    mainListedMovieLI.appendChild(mainListedMovieFIGURE)
    mainListedMovieLI.appendChild(mainListedMovieINPUT)

    return mainListedMovieLI
}

const createAllListedMovie = movie => {
    const listedMovieSPAN = document.createElement('span')
    listedMovieSPAN.innerText = `${movie.title} | `

    const listedMovieINPUT = document.createElement('input')
    listedMovieINPUT.hidden = true
    listedMovieINPUT.setAttribute('type', 'text')
    listedMovieINPUT.setAttribute('value', `${movie.id}`)

    constlistedMovieSPANtotal = document.createElement('span')
    constlistedMovieSPANtotal.setAttribute('class', 'listed-movie movie')
    constlistedMovieSPANtotal.appendChild(listedMovieSPAN)
    constlistedMovieSPANtotal.appendChild(listedMovieINPUT)

    return constlistedMovieSPANtotal
}