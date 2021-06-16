const express = require('express')
var router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId

var { City } = require('../models/city')

//info can be retrieved by going to localhost:3000/city/
router.get('/', (req, res) => {
    City.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving City : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

router.get('/:city/:name', (req, res) => {
    City.find({ city_name: req.params.city, vaccine_name: req.params.name }, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving City : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})  

router.get('/:city', (req, res) => {
    City.find({ city_name: req.params.city}, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving City : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

router.post('/', (req, res) => {
    var city = new City({
        city_name: req.body.city_name,
        vaccine_name: req.body.vaccine_name,
        stock: req.body.stock,
    })
    console.log('at post')
    city.save((err, doc) => {
        if (!err) {
            res.send(doc)
            console.log('city posted!')
        }
        else {
            console.log(`Error in posting Vaccine to city : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }

    var city = new City({
        _id: req.params.id,
        city_name: req.body.city_name,
        vaccine_name: req.body.vaccine_name,
        stock: req.body.stock,
    })

    City.findByIdAndUpdate(req.params.id, { $set: city }, { new: true }, (errs, docs) => {
        if (!errs) {
            res.send(docs)
        }
        else {
            console.log(`Error in Producer Update : ${JSON.stringify(err, undefined, 2)}`)
        }
    });
})



router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id`)
    }

    City.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log(`Error in deleting Vaccine : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})



module.exports = router