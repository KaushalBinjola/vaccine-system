const mongoose = require('mongoose')

// Define collection and schema
let Producer = mongoose.model('Producer', {
    producer_name: {
        type: String
    },
    producer_email: {
        type: String
    },
    password: {
        type: String
    },
    producer_id: {
        type: String
    }
})

module.exports = { Producer }