// const scoreToBeatSpace = document.querySelector('#scoreToBeat-space')
// const scoreToBeat = scoreToBeatSpace.innerText

const progressBar = {
    
    startActor: undefined,
    endActor: undefined,
    
    currentActor: undefined,
    currentMovie: undefined,
    
    currentScore: undefined,
    maxScore: undefined,

    timeline: [],
    timelineNames: '',

    posterPos: 0,
    profilePicPos: 0,

    countStep() {
            this.currentScore++
            document.querySelector('#currentScore-space').innerText = this.currentScore
    },

    setup() {
        this.currentScore = parseInt(document.querySelector('#currentScore-space').innerText, 10)
        this.maxScore = parseInt(document.querySelector('#scoreToBeat-space').innerText, 10)
        this.setStartActor()
        this.setEndActor()
    },

    setStartActor() {

        const startActorId = document.querySelector('#startActor-hidden-span').innerText

        axios
            .get(`${myAPIurl}/game/filmography/${startActorId}`)
            .then(response => {
                const { id, name, image } = response.data
                this.startActor = { id, name, image }
                this.pushToTimeline(this.startActor)
            })
            .catch(err => console.log(err))
    },

    setEndActor() {
        
        const endActorId = document.querySelector('#endActor-hidden-span').innerText

        axios
            .get(`${myAPIurl}/game/filmography/${endActorId}`)
            .then(response => {
                const { id, name, image } = response.data
                this.endActor = { id, name, image }
            })
            .catch(err => console.log(err))
    },

    pushToTimeline(actor) {
        const { id, name, image } = actor
        this.timeline.push({ id, name, image })
    },

    addStep(type, object) {
        switch (type) {
            case 'movie':
                this.addMovieToBar(object.image)
                this.currentMovie = object
                if ((!(this.isEndActorHere())) && (this.currentScore + 1 > this.maxScore)) {
                    this.endgameProtocol('loss')
                }
                break
            case 'actor':
                if (this.isThisEndActor(object)) {
                    this.endgameProtocol('win')
                    break
                }
                else {
                    this.pushToTimeline(object)
                    this.currentActor = this.timeline[this.timeline.length - 1]
                    this.countStep()
                    this.addActorToBar(object.image)
                    break
                }
        }
    },

    addMovieToBar(poster = 'https://imdb-api.com/images/original/nopicture.jpg') {
        this.posterPos++
        document.querySelector(`#movie-icon-${this.posterPos}`).setAttribute('src',`${poster}`)   
    },

    addActorToBar(profilePic = 'https: //imdb-api.com/images/original/nopicture.jpg', status) {
        this.profilePicPos++
        switch (status) {
            case 'win':
                document.querySelectorAll('.actor-icon').forEach(elm => elm.style.backgroundColor = 'green')
                while (this.profilePicPos < (this.maxScore + 1)) {
                    document.querySelector(`#actor-icon-${this.profilePicPos}`).setAttribute('src', `${profilePic}`)
                    this.profilePicPos++
                }
                break
            case 'loss':
                document.querySelectorAll('.actor-icon').forEach(elm => {
                    elm.style.backgroundColor = 'red'
                })
                document.querySelectorAll('.actor-image-inbar').forEach(elm => {
                    elm.setAttribute('src', `${profilePic}`)
                })
                break
            default:
                document.querySelector(`#actor-icon-${this.profilePicPos}`).setAttribute('src', `${profilePic}`)
                break
        }
    },

    isEndActorHere() {
        const idsHere = this.currentMovie.actorList.map(elm => elm.id)
        return idsHere.includes(this.endActor.id)
    },

    isThisEndActor(object) {
        return object.id === this.endActor.id
    },
    
    endgameProtocol(state) {

        this.timeline.forEach(elm => this.timelineNames += ` ${elm.name} to`)
        
        this.pushToTimeline(this.endActor)
        this.timelineNames += ` ${this.timeline[this.timeline.length - 1].name}`
        
        const gameObject = {
            score: parseInt(this.currentScore, 10),
            startActorId: this.startActor.id,
            endActorId: this.endActor.id,
        }

        switch (state) { 
            case 'win':
                this.addActorToBar('/img/kevin-goodjob.jpg', state)
                this.printWinScreen(gameObject)
                break
            case 'loss':
                this.addActorToBar('/img/kevin-gameover.jpg', state)
                this.printGameOver(gameObject)
                break
        }
    },

    printGameOver(game) {

        const { startActorId, endActorId } = game
        const scoreToBeat = game.score
        const gameRestartUrl = `/game/begin?startActorId=${startActorId}&endActorId=${endActorId}&scoreToBeat=${scoreToBeat}`

        document.querySelector('#lists-space').setAttribute('id', 'gameOver-screen')
        document.querySelector('#gameOver-screen').innerHTML = `
            <div class="gameOver-buttons">
            <a href="${gameRestartUrl}">
            <button class = "btn btn-dark"> Try Again... </button>
            </a>
            <span> ${this.endActor.name} is not in ${this.currentMovie.title} and you've run out of moves.</span>
            <a href="/"> Go Back Home </a>
            </div>
            `
    },

    printWinScreen(game) {

        const { startActorId, endActorId, score } = game

        document.querySelector('#lists-space').setAttribute('id', 'winScreen')
        document.querySelector('#winScreen').innerHTML = `<span id="span-black">You went from ${this.timelineNames} in ${this.currentScore} steps!</span>
            <a href="/game/save?startActorId=${startActorId}&endActorId=${endActorId}&score=${score}"><button>Save and go home</button></a>
            `
    }
}