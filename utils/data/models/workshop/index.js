const mongoose = require('mongoose')
const { Schema } = mongoose

const workshopSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: false
    },
    place: {
        type: String,
        required: false
    },
    included: {
        type: String,
        required: false
    },
    other: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    images: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = { workshopSchema }