const mongoose = require('mongoose')
module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isFriend: (id, arr) => arr.includes(id),
    mongoValidation: err => {
        if(err instanceof mongoose.Error.ValidationError) {
            return Object.values(err.errors).map(elm => elm.message).join('<br>')
        } 
    }
}