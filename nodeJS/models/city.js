const mongoose = require('mongoose')

// Define collection and schema
let City = mongoose.model('City', {
    city_name: {
        type: String
    },
    vaccine_name: {
        type: String
    },
    stock: {
        type: Number
    }
})

module.exports = { City: City }