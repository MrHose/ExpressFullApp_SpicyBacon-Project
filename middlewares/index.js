module.exports = {
    
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/auth/login', { errorMessage: 'You were not recognized.' })
        }
    }
}
