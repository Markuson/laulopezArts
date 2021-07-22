const mongoose = require('mongoose')
const { portfolioSchema, sectionSchema, imageSchema } = require('./portfolio')
const { workshopSchema } = require('./workshop')

const model = mongoose.model.bind(mongoose)

module.exports = {
    Portfolio: model('Portfolios', portfolioSchema),
    Sections: model('Sections', sectionSchema),
    Images: model('Inputs', imageSchema),
    Workshops: model('Workshops', workshopSchema)
}