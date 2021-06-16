const express = require('express')
var router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId

var { ProducerVaccine } = require('../models/producerVaccine')
var { Producer } = require('../models/producer')

//getting particular vaccine producers vaccines
router.get('/:name', (req, res) => {
    ProducerVaccine.find({ producer_name: req.params.name }, (err, doc) => {
        if (!err) {
            if (doc.length == 0) {
                return res.status(400).send(`No document with name: ${req.params.name} found!`)
            }
            else {
                console.log(res.send(doc))
            }
        }
        else {
            console.log(`Error in retrieving Vaccines of from Producer name : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

//getting using id
router.get('/stock/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }
    
    ProducerVaccine.find({ _id: req.params.id }, (err, doc) => {
        if (!err) {
            console.log(res.send(doc))
        }
        else {
            console.log(`Error in retrieving Vaccines of from Producer name : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

//posting vaccines by a particular producer
router.post('/:name', (req, res) => {
    Producer.find({ producer_name: req.params.name }, (err, doc) => {
        if (!err) {
            if (doc.length == 0) {
                return res.status(400).send(`No document with name: ${req.params.name} found!`)
            }
        }
        var vaccine = new ProducerVaccine({
            producer_name: req.body.producer_name,
            vaccine_name: req.body.vaccine_name,
            stock: req.body.stock,
            expiry_date: req.body.expiry_date
        })
        vaccine.save((err, doc) => {
            if (!err) {
                res.send(doc)
            }
            else {
                console.log(`Error in posting Vaccine : ${JSON.stringify(err, undefined, 2)}`)
            }
        })
    })
})


//update vaccines by id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }

    var vaccine = new ProducerVaccine({
        _id: req.body._id,
        producer_name: req.body.producer_name,
        vaccine_name: req.body.vaccine_name,
        stock: req.body.stock,
        expiry_date: req.body.expiry_date
    })
    delete vaccine['_id']
    console.log(vaccine)
    ProducerVaccine.findByIdAndUpdate(req.params.id, { $set: vaccine }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log(`Error in updating Vaccine : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }

    ProducerVaccine.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log(`Error in deleting Vaccine : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

module.exports = router