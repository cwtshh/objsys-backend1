const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
    name: String,
    description: String,
    lider: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    students: Array
}, {
    timestamps: true
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
