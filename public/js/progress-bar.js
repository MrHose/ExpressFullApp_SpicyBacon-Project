// const scoreToBeatSpace = document.querySelector('#scoreToBeat-space')
// const scoreToBeat = scoreToBeatSpace.innerText

const progressBar = {
    timeline: [],
    startActor: undefined,
    endActor: undefined,

    currentActor: undefined,
    currentMovie: undefined,

    currentScore: undefined,

    posterPos: 0,
    profilePicPos: 0,

    countStep() {
            this.currentScore++
            document.querySelector('#currentScore-space').innerText = this.currentScore
    },

    setup() {
        this.currentScore = parseInt(document.querySelector('#currentScore-space').innerText, 10)
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
                if ((!(this.isEndActorHere())) && (this.currentScore + 1 > 6)) {
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

    addActorToBar(profilePic = 'https: //imdb-api.com/images/original/nopicture.jpg', fill) {
        this.profilePicPos++
        if (!fill) {
            document.querySelector(`#actor-icon-${this.profilePicPos}`).setAttribute('src', `${profilePic}`)
        } else {
            document.querySelectorAll('.actor-icon').forEach(elm => elm.style.backgroundColor = fill)
            while (this.profilePicPos < 7) {
                document.querySelector(`#actor-icon-${this.profilePicPos}`).setAttribute('src', `${profilePic}`)
                this.profilePicPos++
            }
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
        let fill = ''
        
        let timelineNames = 'From'
        this.timeline.forEach(elm => timelineNames += ` ${elm.name} to`)
        
        this.pushToTimeline(this.endActor)
        timelineNames += ` ${this.timeline[this.timeline.length-1].name}`

        switch (state) {
            case 'win':
                fill = 'green'
                this.addActorToBar('/img/kevin-goodjob.jpg', fill)

                const gameObject = {
                    score: parseInt(this.currentScore, 10),
                    startActorId: this.startActor.id,
                    endActorId: this.endActor.id,
                }
                console.log('YOU WIN')
                console.log(`You went from ${this.startActor.name} to ${this.endActor.name} in ${this.currentScore} steps!`)
                console.log(`Timeline: ${timelineNames}.`)
                console.log(gameObject)
                //win screen
                break
            case 'loss':
                fill = 'red'
                this.addActorToBar('/img/kevin-gameover.jpg', fill)

                console.log('GAME OVER')
                console.log(`${this.endActor.name} is not in ${this.currentMovie.title} and you've run out of moves.`)
                //gameover screen
                break
        }
    }
}