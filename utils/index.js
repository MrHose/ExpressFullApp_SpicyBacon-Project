const mongoose = require('mongoose')

const IMDbApp = require('../services/api-handler')
const IMDb = new IMDbApp

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),

    checkFriendship: (id, arr) => arr.includes(id),

    getActorName: (actorId) => {



        return IMDb.getActorById(actorId)
           
    },

    mongoValidation: err => {
        if(err instanceof mongoose.Error.ValidationError) {
            return Object.values(err.errors).map(elm => elm.message).join('<br>')
        } 
    }
}