const mongoose = require('mongoose')

// Define collection and schema
let Consumer = mongoose.model('Consumer', {
    consumer_name: {
        type: String
    },
    consumer_email: {
        type: String
    },
    password: {
        type: String
    },
    city_name: {
        type: String
    },  
    age: {
        type: Number
    },
    phone_number:{
        type: Number
    }
})

module.exports = { Consumer: Consumer }