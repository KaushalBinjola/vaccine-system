const mongoose = require('mongoose')

// Define collection and schema
let Cart = mongoose.model('Cart', {
    consumer_email: {
        type: String
    },
    vaccine_name: {
        type: String
    },
    stock: {
        type: Number
    },
    return:{
        type: Number
    },
    return_reason:{
        type: String
    }
})

module.exports = { Cart: Cart }