const express = require('express')
const router = express.Router()

const { isFriend } = require('../utils')
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
        .then(currentUser => res.render('pages/user/profile', currentUser))
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

    if (id === currentUser._id) { res.redirect('/user/') }
    
    User
        .findById(id)
        .then(theUser => {
            userForDetails = theUser
            return User.findById(currentUser._id).populate('history')
        })
        .then(nowUser => {
            const result = isFriend(id, nowUser.friends)
            res.render('pages/user/details', {userForDetails, result, nowUser})
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