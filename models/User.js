const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    universityID: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String } // opcional
});

module.exports = mongoose.model('User', userSchema);
