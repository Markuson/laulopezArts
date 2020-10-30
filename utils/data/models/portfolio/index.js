const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const sectionSchema = new Schema({
    name: {
        type: String,
        enum: ['ilsutration', 'screenprinting', 'science', 'other']
    },

    images: [imageSchema]
})

const portfolioSchema = new Schema({
    sections: [sectionSchema],
})

module.exports = { portfolioSchema, sectionSchema, imageSchema }