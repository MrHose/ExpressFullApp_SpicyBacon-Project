const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')
const User = require('./../models/user.model')
const mongoose = require('mongoose')

//Endpoints
//User Profile (get)
router.get('/', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    res.render('pages/user/profile', currentUser)
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
            res.render('pages/user/allusers', { otherUsers })
        })
        .catch(err => console.log('Error!', err))
})

//User Details (get)
router.get('/details/:id', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    const { id } = req.params
    User
        .findById(id)
        .then(theUser => res.render('pages/user/details', { theUser, currentUser }))
        .catch(err => console.log('Error!', err))
})

//Add to Friends (post)
router.post('/addFriend/:id', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    const { id } = req.params
    currentUser.friends.push(id)
    console.log(currentUser)
    res.render('pages/user/profile', currentUser)
})

module.exports = router