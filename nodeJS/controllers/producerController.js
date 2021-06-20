const express = require('express')
const jwt = require('jsonwebtoken')
var router = express.Router()
// var ObjectId = require('mongoose').Types.ObjectId

var { Producer } = require('../models/producer')


//info can be retrieved by going to localhost:3000/producer/
router.get('/', (req, res) => {
    Producer.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving Producer : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

//getting according to particular name
router.get('/:name', (req, res) => {
    Producer.find({ producer_name: req.params.name }, (err, doc) => {
        if (!err) {
            if (doc.length == 0) {
                return res.status(400).send(`No document with name: ${req.params.name} found!`)
            }
            else {
                console.log(res.send(doc))
            }
        }
        else {
            console.log(`Error in retrieving Producer of name : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

// get according to email
router.get('/email/:email', (req, res) => {
    Producer.find({ producer_email: req.params.email }, (err, doc) => {
        if (!err) {
            if (doc.length == 0) {
                return res.status(400).send(`No document with name: ${req.params.name} found!`)
            }
            else {
                res.send(doc)
                return doc
            }
        }
        else {
            console.log(`Error in retrieving Producer of name : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})



//for login 
router.get('/login/:email/:password', (req, res) => {
    Producer.find({ producer_email: req.params.email, password: req.params.password }, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(`Error in retrieving Producer : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})

// making token
router.get('/token/:email/:name', (req, res) => {
    tokenDetails = {
        name: req.params.name,
        email:req.params.email,
        admin: true
    }
    token = jwt.sign(tokenDetails, 'sfnklsdhfdsklfhesfklsnceklfhesiofsdjcklsfjew9f')
    res.send(JSON.stringify(token))
})


//posting info
router.post('/', (req, res) => {
    var producer = new Producer({
        producer_name: req.body.producer_name,
        producer_email: req.body.producer_email,
        password: req.body.password,
        producer_id: req.body.producer_id
    })
    producer.save((err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log(`Error in posting Producer : ${JSON.stringify(err, undefined, 2)}`)
        }
    })
})




//update according to name
router.put('/:name', (req, res) => {
    Producer.find({ producer_name: req.params.name }, (err, doc) => {
        if (!err) {
            if (doc.length == 0) {
                return res.status(400).send(`No document with name: ${req.params.name} found!`)
            }
        }
        id = doc[0]['_id']
        var prod = {
            producer_name: req.body.producer_name,
            producer_email: req.body.producer_email,
            password: req.body.password,
            producer_id: req.body.producer_id
        }
        Producer.findByIdAndUpdate(id, { $set: prod }, { new: true }, (errs, docs) => {
            if (!errs) {
                res.send(docs)
            }
            else {
                console.log(`Error in Producer Update : ${JSON.stringify(err, undefined, 2)}`)
            }
        });
    })

})

//delete 
router.delete('/:name', (req, res) => {
    Producer.find({ producer_name: req.params.name }, (err, doc) => {
        if (!err) {
            if (doc.length == 0) {
                return res.status(400).send(`No document with name: ${req.params.name} found!`)
            }
        }
        id = doc[0]['_id']
        Producer.findByIdAndDelete(id, (errs, docs) => {
            if (!errs) {
                res.send(docs)
            }
            else {
                console.log(`Error in Producer Delete : ${JSON.stringify(err, undefined, 2)}`)
            }
        });
    })

})

module.exports = router