const mongoose = require('mongoose')

// Define collection and schema
let ProducerVaccine = mongoose.model('ProducerVaccine', {
    producer_name: {
        type: String
    },
    vaccine_name: {
        type: String
    },
    stock: {
        type: Number
    },
    expiry_date:{
        type: Date
    }
})

module.exports = { ProducerVaccine: ProducerVaccine }