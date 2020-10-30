require('dotenv').config()
const { expect } = require ('chai')
const logic = require('./api')
const {AssertionError, FormatError, LogicError} = require ('../utils/errors')
const {models, mongoose} = require('data')
const portfolio = require('../utils/data/models/portfolio')

const { Portfolio, Images, Sections } = models;
const { env: { MONGO_URL_TEST: url }} = process


require('dotenv').config()

let imageData= {
    description:'test description',
    publicId:'testPublicId',
    section:'other',
    url:'http://testimageurl.com'
}

describe('Logic', () => {

    before(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    beforeEach(async () => {
        await Portfolio.deleteMany()
    })

    describe('addImage', () => {
        it('should succeed on adding an image', async () => {

            const res = await logic.addImage(imageData)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(1)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[0]).to.exist
            expect(_portfolio[0].sections[0].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[0].images.length).to.equal(1)
            expect(_portfolio[0].sections[0].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[0].images[0]).to.exist
            expect(_portfolio[0].sections[0].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[0].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[0].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[0].images[0].date).to.be.an.instanceOf(Date)
        })

        it('should succeed on adding two images on diferent sections', async () => {

            const res = await logic.addImage(imageData)
            expect(res).to.not.exist

            let _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(1)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[0]).to.exist
            expect(_portfolio[0].sections[0].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[0].images.length).to.equal(1)
            expect(_portfolio[0].sections[0].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[0].images[0]).to.exist
            expect(_portfolio[0].sections[0].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[0].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[0].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[0].images[0].date).to.be.an.instanceOf(Date)

            imageData.section = 'screenprinting'
            const res2 = await logic.addImage(imageData)
            expect(res2).to.not.exist

            _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(2)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[0].images.length).to.equal(1)
            expect(_portfolio[0].sections[1]).to.exist
            expect(_portfolio[0].sections[1].images.length).to.equal(1)
            expect(_portfolio[0].sections[1].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[1].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[1].images[0]).to.exist
            expect(_portfolio[0].sections[1].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[1].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[1].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[1].images[0].date).to.be.an.instanceOf(Date)
        })

        xit('should fail on repeated url image on same section', async () => {
            // wrongText=null
            // try {
            //     await logic.nodemailerSend(email, subject, wrongText)
            //     throw Error('should not reach this point')
            // } catch (error) {
            //     expect(error).to.exist
            //     expect(error).to.be.instanceOf(Error)
            //     expect(error.message).to.equal(`text is not optional`)
            // }
        })

        xit('should fail on repeated url image on different section', async () => {

        })

        xit('should fail on repeated publicId on same section', async () => {

        })

        xit('should fail on repeated publicId on different section', async () => {

        })

        xit('should fail on not valid section', async () => {

        })

        xit('should fail on undefined section', async () => {

        })

        xit('should fail on null section', async () => {

        })

        xit('should fail on empty section', async () => {

        })

        xit('should fail on not valid publicId', async () => {

        })

        xit('should fail on undefined publicId', async () => {

        })

        xit('should fail on null publicId', async () => {

        })

        xit('should fail on empty publicId', async () => {

        })

        xit('should fail on not valid description', async () => {

        })

        xit('should fail on undefined description', async () => {

        })

        xit('should fail on null description', async () => {

        })

        xit('should fail on empty description', async () => {

        })

        xit('should fail on not valid url', async () => {

        })

        xit('should fail on undefined url', async () => {

        })

        xit('should fail on null url', async () => {

        })

        xit('should fail on empty url', async () => {

        })


    })

    after(async () => {
        mongoose.disconnect()
    })
})