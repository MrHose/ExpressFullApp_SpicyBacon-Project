const constructSearchResult = (searchResult, side) => {
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
    listedActorFIGCAPTION.innerText = actor.name

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