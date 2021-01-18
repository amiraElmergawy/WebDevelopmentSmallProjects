const mongoose = require('mongoose')
// const validator = require('validator')

const customer = mongoose.model('customer', {
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    balance: {
        type: Number,
        default: 1000,
    }
})



module.exports = customer