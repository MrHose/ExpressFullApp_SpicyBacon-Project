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
  document.querySelector('#end-search-input').setAttribute('placeholder', `randomActorName`)
}