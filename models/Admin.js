const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: String,
    email: String,
    password: String,
    type: String,
}, {
    timestamps: true
});

const admin = mongoose.model('Admin', AdminSchema);

module.exports = admin;