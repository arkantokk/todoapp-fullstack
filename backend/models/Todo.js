const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

TodoSchema.index({
    owner: 1,
    date: 1
})

module.exports = mongoose.model('Todo', TodoSchema);