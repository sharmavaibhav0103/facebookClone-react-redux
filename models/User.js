const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: { 
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.model('user', UserSchema);