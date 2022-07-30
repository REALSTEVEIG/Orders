const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    origin : {
        type : String
    },
    destination : {
        type : String
    }
})

module.exports = mongoose.model('Order', orderSchema)