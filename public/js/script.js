//const myAPIurl = 'http://localhost:3000'
const myAPIurl = 'https://spicy-bacon-jw.herokuapp.com/'

window.addEventListener('load', () => {

  //PlayArea
  if (document.querySelector('#progress-bar')) {
    progressBar.setup()
    setupMovieClick()
  }

  //Search actors buttons
  randomStartActor()
  addSearchFunctionality('start')
  addSearchFunctionality('end')
})


const randomStartActor = () => {
  document.querySelector('#start-search-input') ? getAndSetRandomActor() : null
}


const getAndSetRandomActor = () => {
  axios
    .get(`${myAPIurl}/game/randomActor`)
    .then(response => {
      const randomNum = Math.floor(Math.random() * 100)
      return response.data[randomNum]
    })
    .then(randomActor => {
      document.querySelector('#start-search-input').setAttribute('placeholder', `${randomActor}`)
    })
    .catch(err => console.log(err))
}
