const express = require('express')
var router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId

var { Cart } = require('../models/cart')


// info can be retrieved by going to localhost:3000/cart/
router.get('/', (req, res) => {
    Cart.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving Producer : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

router.get('/:email', (req, res) => {
    Cart.find({ consumer_email: req.params.email }, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving Producer : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})


//posting vaccines by a particular consumer
router.post('/', (req, res) => {
    var cart = new Cart({
        consumer_email: req.body.consumer_email,
        vaccine_name: req.body.vaccine_name,
        stock: req.body.stock,
        return: req.body.return,
        return_reason: req.body.return_reason
    })
    cart.save((err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log(`Error in posting Vaccine : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})


// put according to id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }
    var cart = new Cart({
        _id: req.params.id,
        consumer_email: req.body.consumer_email,
        vaccine_name: req.body.vaccine_name,
        stock: req.body.stock,
        return: req.body.return,
        return_reason: req.body.return_reason
    })

    Cart.findByIdAndUpdate(req.params.id, { $set: cart }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log(`Error in Cart Update : ${JSON.stringify(err, undefined, 2)}`)
        }
    })

})


//delete 
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }
    Cart.findByIdAndDelete(req.params.id, (errs, docs) => {
        if (!errs) {
            res.send(docs)
        }
        else {
            console.log(`Error in Cart Delete : ${JSON.stringify(err, undefined, 2)}`)
        }
    });
})


module.exports = router