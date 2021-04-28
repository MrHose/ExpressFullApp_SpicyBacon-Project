window.addEventListener('load', () => {

  setRandomEndActor()

  //Search actors buttons
  addSearchFunctionality('start')
  addSearchFunctionality('end')

  //PlayArea
  //Click on a movie
  setupMovieClick()

})

const setRandomEndActor = () => {
  if (!document.querySelector('#end-search-input')) { null }
  else {
    randomActorName = getRandomActor()
    document.querySelector('#end-search-input').setAttribute('placeholder', `${randomActorName}`)
  }
}

const getRandomActor = () => {
  
}