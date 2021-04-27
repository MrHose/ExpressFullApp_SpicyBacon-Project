const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')
const User = require('./../models/user.model')
const mongoose = require('mongoose')

//Endpoints
//User Profile (get)
router.get('/', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    User
    .findById(currentUser._id)
    .then(friends => {
        res.render('pages/user/profile', { currentUser, friends })
        console.log('yeeeeeee', )
    })
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
            res.render('pages/user/allusers', { otherUsers })
        })
        .catch(err => console.log('Error!', err))
})

//User Details (get)
router.get('/details/:id', isLoggedIn, (req, res) => {
    currentUser = req.session.currentUser
    const { id } = req.params
    console.log(id, currentUser._id)
    if(id === currentUser._id) { res.render('pages/user/profile', currentUser)}
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
    User
    .findByIdAndUpdate(currentUser.id, { friends: currentUser.friends })
    .then(() => {
        console.log(currentUser.friends)
        res.redirect('/user/')
    })
    
    .catch(err => console.log('Error!', err)) 
})

module.exports = router