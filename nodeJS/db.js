const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vaccineSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log("Connection to DB successful.")
    }
    else {
        console(`Error in connection: ${JSON.stringify(err, undefined, 2)}`) //ask this undefined thing!
    }
})


module.exports = mongoose
