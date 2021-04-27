module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/game', require('./game.routes.js'))
    app.use('/auth', require('./auth.routes.js'))
    app.use('/user', require('./user.routes.js'))
}