const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false 
    },
    usedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
})

module.exports = mongoose.model('Token', TokenSchema);