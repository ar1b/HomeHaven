const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ['apartment', 'house', 'condo'],
            message: 'Invalid housing type'
        }
    },
    pictures: {
        type: Buffer,
        contentType: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('listings', schema);