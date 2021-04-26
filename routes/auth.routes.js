const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')

// Endpoints

//User Profile (get)
router.get('/profile', (req, res) => {
    currentUser = req.session.currentUser
    console.log(currentUser)
    res.render('pages/auth/profile', currentUser)
})

// Signup form page (get)
router.get('/signup', (req, res) => {
    res.render('pages/auth/signup')
})

// Signup button (post)
router.post('/signup', (req, res, next) => {
    const { username, pwd } = req.body
    User
        .findOne({ username })
        .then(user => {
            //If a user already exists with that name
            if (user) {
                res.render('pages/auth/signup', { errorMessage: 'Nombre de usuario ya registrado' })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)
            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => {
                    if (err instanceof mongoose.Error.ValidationError) {
                        console.log(err.errors)
                    } else {
                        next()
                    }
                })
        })
        .catch(err => console.log('error', err))
})

// Login form page (get)
router.get('/login', (req, res) => {
    res.render('pages/auth/login')
})

// Login button (post)
router.post('/login', (req, res) => {
    const { username, pwd } = req.body
    User
        .findOne({ username })
        .then(user => {
            //If user doesnt exist
            if (!user) {
                res.render('pages/auth/login', { errorMessage: 'Usuario no reconocido.' })
                return
            }
            //If password doesnt match
            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('pages/auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }
            req.session.currentUser = user
            res.redirect('/auth/profile')
        })
        .catch(err => console.log('error', err))
})

//Close session button (get)
router.get('/exit', (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

module.exports = router