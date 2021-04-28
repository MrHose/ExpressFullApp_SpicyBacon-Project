const express = require('express')
const { isFriend } = require('../utils')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')
const User = require('./../models/user.model')


//Endpoints
//User Profile (get)
router.get('/', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    User
    .findById(currentUser._id)
    .populate('friends')
    .then(currentUser => res.render('pages/user/profile', currentUser)) 
    .catch(err => console.log('Error!', err))
})

//All Users (get)
router.get('/allusers', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    User
        .find()
        .then(allUsers => {
            const otherUsers = allUsers.filter(elm => {
            return elm.id !== currentUser._id  
            })
            res.render('pages/user/allusers', { otherUsers,  })
        })
        .catch(err => console.log('Error!', err))
})

//User Details (get)
router.get('/details/:id', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    const { id } = req.params
    if(id === currentUser._id) { res.redirect('/user/')}
    User
        .findById(id)
        .then(theUser => {
            const result = isFriend()
            res.render('pages/user/details', {theUser})
        })
        .catch(err => console.log('Error!', err))
    
})

//Add to Friends (post)
router.post('/addFriend/:id', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    const { id } = req.params
    User
   .findByIdAndUpdate({ _id: currentUser._id }, { $push: { friends: id }})
   .then(() => res.redirect('/user/allUsers'))
   .catch(err => console.log('Error!', err))     
    
    
})
//Remove a Friend (post)
router.post('/removeFriend/:id', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    const { id } = req.params
    User
   .findByIdAndUpdate({ _id: currentUser._id }, { $pull: { friends: id }})
   .then(() => res.redirect('/user/'))
   .catch(err => console.log('Error!', err))     
    
    
})

module.exports = router