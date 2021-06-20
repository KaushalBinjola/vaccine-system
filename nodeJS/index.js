const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose } = require('./db.js')
var producerController = require('./controllers/producerController')
var producerVaccineController = require('./controllers/producerVaccineController')
var cityController = require('./controllers/cityController')
var consumerController = require('./controllers/consumerController')
var cartController = require('./controllers/cartController')


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.listen(3000, () => { console.log("Server started at : 3000") })


app.use('/producer', producerController)
app.use('/vaccine', producerVaccineController)
app.use('/city', cityController)
app.use('/consumer',consumerController)
app.use('/cart',cartController)
