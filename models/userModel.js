const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String
    },
    phoneNo: {
        required: true,
        type: String,
        unique: true,
    },
    emailID: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('user', user)