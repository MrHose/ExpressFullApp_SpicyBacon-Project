const express = require('express')
const router = express.Router()

const { checkFriendship } = require('../utils')
const { getActorName } = require('../utils')

const { isLoggedIn } = require('./../middlewares')

const User = require('./../models/user.model')


//User Profile (get)
router.get('/', isLoggedIn, (req, res) => {

    const { currentUser } = req.session

    User
        .findById(currentUser._id)
        .populate('friends')
        .populate('history')
        .populate('challenges.from')
        .populate('challenges.game')
        .then(currentUser => {
            
            const promisesArr = []

            currentUser.history.forEach(elm => promisesArr.push(getActorName(elm.startActorId), getActorName(elm.endActorId)))

            const promisesArr2 = []

            currentUser.challenges.forEach(elm => promisesArr2.push(getActorName(elm.game.startActorId), getActorName(elm.game.endActorId)))

            Promise
                .all(promisesArr)
                .then(response => {

                    const allNames = response.map(elm => {
                        return elm.data.name
                    })
                    const startActorNames = allNames.filter(elm => (allNames.indexOf(elm) % 2) === 0)
                    const endActorNames = allNames.filter(elm => (allNames.indexOf(elm) % 2) > 0)
                    currentUser.history.forEach((elm, index) => {
                        elm.startActorId = startActorNames[index]
                        elm.endActorId = endActorNames[index]
                    })
                    return Promise.all(promisesArr2)
                })
                .then(response2 => {

                    const allNames2 = response2.map(elm => {
                        return elm.data.name
                    })
                    const startActorNames2 = allNames2.filter(elm => (allNames2.indexOf(elm) % 2) === 0)
                    const endActorNames2 = allNames2.filter(elm => (allNames2.indexOf(elm) % 2) > 0)
                    currentUser.challenges.forEach((elm, index) => {
                        elm.game.startActorId = startActorNames2[index]
                        elm.game.endActorId = endActorNames2[index]
                    })
                    
                    currentUser.challenges.reverse()
                    res.render('pages/user/profile', currentUser)
                })
                .catch(err => console.log('Error!', err))
        })
        .catch(err => console.log('Error!', err))
})


//All Users (get)
router.get('/allusers', isLoggedIn, (req, res) => {

    const { currentUser } = req.session

    User
        .find()
        .select('username')
        .then(allUsers => {
            const otherUsers = allUsers.filter(elm => { return elm.id !== currentUser._id })
            res.render('pages/user/allusers', { otherUsers })
        })
        .catch(err => console.log('Error!', err))
})


//User Details (get)
router.get('/details/:id', isLoggedIn, (req, res) => {

    const { currentUser } = req.session
    const { id } = req.params
    let userForDetails = ''
    let isFriend = ''
    let nowUser = ''

    if (id === currentUser._id) { res.redirect('/user/') }
    
    User
        .findById(id)
        .then(theUser => {
            userForDetails = theUser
            return User.findById(currentUser._id).populate('history')
        })
        .then(foundUser => {
            nowUser = foundUser
            isFriend = checkFriendship(id, nowUser.friends)

            const promisesArr = []

            nowUser.history.forEach(elm => promisesArr.push(getActorName(elm.startActorId), getActorName(elm.endActorId)))

            Promise
                .all(promisesArr)
                .then(response => {

                    const allNames = response.map(elm => {
                        return elm.data.name
                    })
                    const startActorNames = allNames.filter((elm, index) => (index % 2) === 0)
                    const endActorNames = allNames.filter((elm, index) => (index % 2) > 0)
                    nowUser.history.forEach((elm, index) => {
                        elm.startActorId = startActorNames[index]
                        elm.endActorId = endActorNames[index]
                    })
                    
                    res.render('pages/user/details', { userForDetails, isFriend, nowUser })
                })
                .catch(err => console.log('Error!', err))

        })
        .catch(err => console.log('Error!', err))
})

//Add to Friends (post)
router.post('/addFriend/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    const { currentUser } = req.session

    User
        .findByIdAndUpdate({ _id: currentUser._id }, { $push: { friends: id }})
        .then(() => res.redirect(`/user/details/${id}`))
        .catch(err => console.log('Error!', err))     
})


//Remove a Friend (post)
router.post('/removeFriend/:id', isLoggedIn, (req, res) => {

    const { currentUser} = req.session
    const { id } = req.params

    User
        .findByIdAndUpdate({ _id: currentUser._id }, { $pull: { friends: id }})
        .then(() => res.redirect(`/user/details/${id}`))
        .catch(err => console.log('Error!', err))     
})


//Challenge a friend (post)
router.post('/challenge/:userId', (req, res) => {

    const { userId } = req.params
    const { game } = req.body
    const { currentUser } = req.session
    const challenge = {
        from: currentUser._id,
        game
    }

    User
        .findByIdAndUpdate(userId, { $push: { challenges: challenge }})
        .then(updatedUser => {
            res.redirect(`/user/details/${userId}`)
        })
        .catch(err => console.log('Error!', err))
})


module.exports = router