const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    name: String,
    matricula: String,
    email: String,
    password: String,
}, {
    timestamps: true
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;