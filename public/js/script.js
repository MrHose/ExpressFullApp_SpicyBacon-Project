window.addEventListener('load', () => {

  //Search actors buttons
  addSearchFunctionality('start')
  addSearchFunctionality('end')

})

const addSearchFunctionality = side => {
  document.getElementById(`${side}-search-button`).addEventListener('click', function (event) {
    const actorToSearch = getActorToSearch(side)
    const searchResultsSpace = document.querySelector(`#${side}-search-results`)
    axios
      .get(`http://localhost:3000/game/actor/${actorToSearch}`)
      .then(response => {
        const { data } = response
        let searchResults = ''
        data.forEach(elm => searchResults += constructSearchResult(elm, side))
        searchResultsSpace.innerHTML = searchResults
        addSearchResultFunctionality(side)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

const getActorToSearch = side => {
  if (document.getElementById(`${side}-search-input`).value) {
    return document.getElementById(`${side}-search-input`).value
  } else {
    return 'Kevin Bacon'
  }
}

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

const addSearchResultFunctionality = side => {
  document.querySelectorAll(`.result-${side}`).forEach(elm => {
    chooseSearchResult(elm, side)
  })
}

function chooseSearchResult(searchResultBlock, side) {
  searchResultBlock.addEventListener('click', function (event) {
    const selectedActor = event.currentTarget.outerHTML
    document.querySelector(`.${side}-search-group`).innerHTML = selectedActor

    const selectedActorId = event.currentTarget.querySelector('span').innerText
    document.querySelector(`#${side}-actorId`).value = selectedActorId

    if (document.querySelectorAll('.search-button').length < 1) {
      createButton(6)
    }
  })
}

function createButton(scoreToBeat) {
  const startActorId = document.querySelector('#start-actorId').value
  const endActorId = document.querySelector('#end-actorId').value
  
  const beginButton = document.createElement('a')
  beginButton.setAttribute('href', `/game/begin?startActorId=${startActorId}&endActorId=${endActorId}&scoreToBeat=${scoreToBeat}`)
  beginButton.innerHTML = `<button id="begin-button">Begin Game!</button>`
  document.querySelector('#begin-button-space').innerHTML = beginButton.outerHTML
}