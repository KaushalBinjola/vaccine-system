const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose } = require('./db.js')
var producerController = require('./controllers/producerController')
var producerVaccineController = require('./controllers/producerVaccineController')

let app = express();

//?????????????????????
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.listen(3000, () => { console.log("Server started at : 3000") })


app.use('/producer', producerController)
app.use('/vaccine', producerVaccineController)