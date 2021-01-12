require('dotenv').config()
const { expect } = require('chai')
const logic = require('./app')
const { models, mongoose } = require('data')

const { Portfolio } = models;
const { env: { MONGO_URL_TEST: url } } = process

let random = Math.random()

let imageData = {
    description: `test description${random}`,
    publicId: `testPublicId${random}`,
    section: 'other',
    url: `http://testimageurl.com/${random}`
}

xdescribe('Logic', () => {

    beforeEach(async () => {
        await Portfolio.deleteMany()
        imageData = {
            description: 'test description',
            publicId: 'testPublicId',
            section: 'other',
            url: 'http://testimageurl.com'
        }
    })

    describe('addImage', () => {
        it('should succeed on adding an image on "other" section', async () => {

            const res = await logic.addImageData(imageData)
            // expect(res).to.not.exist

            // const _portfolio = await Portfolio.find({})

            // expect(_portfolio).to.exist
            // expect(_portfolio.length).to.equal(1)
            // expect(_portfolio[0].sections).to.exist
            // expect(_portfolio[0].sections.length).to.equal(4)
            // expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            // const sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == imageData.section)
            // expect(_portfolio[0].sections[sectionIndex]).to.exist
            // expect(_portfolio[0].sections[sectionIndex].name).to.equal(imageData.section)
            // expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            // expect(_portfolio[0].sections[sectionIndex].images).to.be.an.instanceOf(Array)
            // expect(_portfolio[0].sections[sectionIndex].images[0]).to.exist
            // expect(_portfolio[0].sections[sectionIndex].images[0].url).to.equal(imageData.url)
            // expect(_portfolio[0].sections[sectionIndex].images[0].publicId).to.equal(imageData.publicId)
            // expect(_portfolio[0].sections[sectionIndex].images[0].description).to.equal(imageData.description)
            // expect(_portfolio[0].sections[sectionIndex].images[0].date).to.be.an.instanceOf(Date)
        })

        xit('should succeed on adding an image on "ilustration" section', async () => {
            imageData.section = "ilustration"
            const res = await logic.addImage(imageData)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(4)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            const sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == imageData.section)
            expect(_portfolio[0].sections[sectionIndex]).to.exist
            expect(_portfolio[0].sections[sectionIndex].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            expect(_portfolio[0].sections[sectionIndex].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[sectionIndex].images[0]).to.exist
            expect(_portfolio[0].sections[sectionIndex].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[sectionIndex].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[sectionIndex].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[sectionIndex].images[0].date).to.be.an.instanceOf(Date)
        })

        xit('should succeed on adding an image on "screenprinting" section', async () => {
            imageData.section = "screenprinting"
            const res = await logic.addImage(imageData)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(4)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            const sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == imageData.section)
            expect(_portfolio[0].sections[sectionIndex]).to.exist
            expect(_portfolio[0].sections[sectionIndex].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            expect(_portfolio[0].sections[sectionIndex].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[sectionIndex].images[0]).to.exist
            expect(_portfolio[0].sections[sectionIndex].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[sectionIndex].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[sectionIndex].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[sectionIndex].images[0].date).to.be.an.instanceOf(Date)
        })

        xit('should succeed on adding an image on "science" section', async () => {
            imageData.section = "science"
            const res = await logic.addImage(imageData)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(4)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            const sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == imageData.section)
            expect(_portfolio[0].sections[sectionIndex]).to.exist
            expect(_portfolio[0].sections[sectionIndex].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            expect(_portfolio[0].sections[sectionIndex].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[sectionIndex].images[0]).to.exist
            expect(_portfolio[0].sections[sectionIndex].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[sectionIndex].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[sectionIndex].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[sectionIndex].images[0].date).to.be.an.instanceOf(Date)
        })

        xit('should succeed on adding two images on diferent sections', async () => {

            const res = await logic.addImage(imageData)
            expect(res).to.not.exist

            let _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(4)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            let sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == imageData.section)
            expect(_portfolio[0].sections[sectionIndex]).to.exist
            expect(_portfolio[0].sections[sectionIndex].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            expect(_portfolio[0].sections[sectionIndex].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[sectionIndex].images[0]).to.exist
            expect(_portfolio[0].sections[sectionIndex].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[sectionIndex].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[sectionIndex].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[sectionIndex].images[0].date).to.be.an.instanceOf(Date)

            imageData.section = 'screenprinting'
            imageData.url = 'http://testimageurl2.com'
            imageData.publicId = 'testPublicId2'

            const res2 = await logic.addImage(imageData)
            expect(res2).to.not.exist

            _portfolio = await Portfolio.find({})

            expect(_portfolio).to.exist
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections).to.exist
            expect(_portfolio[0].sections.length).to.equal(4)
            expect(_portfolio[0].sections).to.be.an.instanceOf(Array)
            sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == imageData.section)
            expect(_portfolio[0].sections[sectionIndex]).to.exist
            expect(_portfolio[0].sections[sectionIndex].name).to.equal(imageData.section)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            expect(_portfolio[0].sections[sectionIndex].images).to.be.an.instanceOf(Array)
            expect(_portfolio[0].sections[sectionIndex].images[0]).to.exist
            expect(_portfolio[0].sections[sectionIndex].images[0].url).to.equal(imageData.url)
            expect(_portfolio[0].sections[sectionIndex].images[0].publicId).to.equal(imageData.publicId)
            expect(_portfolio[0].sections[sectionIndex].images[0].description).to.equal(imageData.description)
            expect(_portfolio[0].sections[sectionIndex].images[0].date).to.be.an.instanceOf(Date)
        })

        xit('should fail on repeated url image on same section', async () => {
            try {
                await logic.addImage(imageData)
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`The image you want to add already exists in your portfolio`)
            }
        })

        xit('should fail on repeated url image on different section', async () => {
            try {
                await logic.addImage(imageData)
                imageData.section = 'screenprinting'
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`The image you want to add already exists in your portfolio`)
            }
        })

        xit('should fail on repeated publicId on same section', async () => {
            try {
                await logic.addImage(imageData)
                imageData.url = 'http://testimageurl2.com'
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`The image you want to add already exists in your portfolio`)
            }
        })

        xit('should fail on repeated publicId on different section', async () => {
            try {
                await logic.addImage(imageData)
                imageData.url = 'http://testimageurl2.com'
                imageData.section = 'screenprinting'
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`The image you want to add already exists in your portfolio`)
            }
        })

        xit('should fail on not valid section', async () => {
            try {
                imageData.section = 'noValidSection'
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`${imageData.section} is not a valid section`)
            }
        })

        xit('should fail on undefined section', async () => {
            try {
                imageData.section = undefined
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })

        xit('should fail on null section', async () => {
            try {
                imageData.section = null
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })

        xit('should fail on empty section', async () => {
            try {
                imageData.section = ''
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is empty`)
            }
        })

        xit('should fail on not valid publicId', async () => {
            try {
                imageData.publicId = 2
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId ${imageData.publicId} is not a string`)
            }
        })

        xit('should fail on undefined publicId', async () => {
            try {
                imageData.publicId = undefined
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        xit('should fail on null publicId', async () => {
            try {
                imageData.publicId = null
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        xit('should fail on empty publicId', async () => {
            try {
                imageData.publicId = ''
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is empty`)
            }
        })

        xit('should fail on not valid description', async () => {
            try {
                imageData.description = 2
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description ${imageData.description} is not a string`)
            }
        })

        xit('should fail on undefined description', async () => {
            try {
                imageData.description = undefined
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is not optional`)
            }
        })

        xit('should fail on null description', async () => {
            try {
                imageData.description = null
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is not optional`)
            }
        })

        xit('should fail on empty description', async () => {
            try {
                imageData.description = ''
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is empty`)
            }
        })

        xit('should fail on not valid url', async () => {
            try {
                imageData.url = 'not an url'
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`${imageData.url} is not a url`)
            }
        })

        xit('should fail on undefined url', async () => {
            try {
                imageData.url = undefined
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`url is not optional`)
            }
        })

        xit('should fail on null url', async () => {
            try {
                imageData.url = null
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`url is not optional`)
            }
        })

        xit('should fail on empty url', async () => {
            try {
                imageData.url = ''
                await logic.addImage(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`url is empty`)
            }
        })


    })

    xdescribe('deleteImage', () => {
        it('should succeed on deleting an image', async () => {

            await logic.addImage(imageData)
            const res = await logic.deleteImage(imageData.publicId)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})
            expect(_portfolio.length).to.equal(1)

            let imageFound = false
            _portfolio[0].sections.forEach(_section => {
                const filteredImages = _section.images.filter(_image => _image.publicId = imageData.publicId)
                if (filteredImages.length > 0) imageFound = true
            })

            expect(imageFound).to.be.false
        })

        it('should succeed on deleting an image', async () => {

            await logic.addImage(imageData)

            imageData = {
                description: 'test description',
                publicId: 'testPublicId2',
                section: 'other',
                url: 'http://testimageurl2.com'
            }
            let section1 = imageData.section
            await logic.addImage(imageData)

            imageData = {
                description: 'test description',
                publicId: 'testPublicId3',
                section: 'screenprinting',
                url: 'http://testimageurl3.com'
            }
            let section2 = imageData.section
            await logic.addImage(imageData)

            imageData.publicId = 'testPublicId'
            const res = await logic.deleteImage(imageData.publicId)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})
            expect(_portfolio.length).to.equal(1)
            expect(_portfolio[0].sections.length).to.equal(4)
            let sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == section1)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)
            sectionIndex = _portfolio[0].sections.findIndex(_section => _section.name == section2)
            expect(_portfolio[0].sections[sectionIndex].images.length).to.equal(1)

            let imageFound = false
            _portfolio[0].sections.forEach(_section => {
                const filteredImages = _section.images.filter(_image => _image.publicId == imageData.publicId)
                filteredImages
                if (filteredImages.length > 0) imageFound = true
            })

            expect(imageFound).to.be.false
        })

        it('should fail on publicId not found', async () => {
            try {
                imageData.publicId = 'notFoundPublicId'
                await logic.deleteImage(imageData.publicId)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`The image you want to delete doesn't exist in your portfolio`)
            }
        })

        it('should fail on not valid publicId', async () => {
            try {
                imageData.publicId = 2
                await logic.deleteImage(imageData.publicId)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId ${imageData.publicId} is not a string`)
            }
        })

        it('should fail on undefined publicId', async () => {
            try {
                imageData.publicId = undefined
                await logic.deleteImage(imageData.publicId)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        it('should fail on null publicId', async () => {
            try {
                imageData.publicId = null
                await logic.deleteImage(imageData.publicId)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        it('should fail on empty publicId', async () => {
            try {
                imageData.publicId = ''
                await logic.deleteImage(imageData.publicId)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is empty`)
            }
        })
    })

    xdescribe('editImage', () => {
        it('should succeed on editing the description of an image', async () => {

            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId1`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId2`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId3`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: "new description",
                section: imageData.section
            }
            const res = await logic.editImage(imageData.publicId, data)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})
            expect(_portfolio.length).to.equal(1)

            let imageFound = 0
            let filteredImage
            let sectionFound = ''
            _portfolio[0].sections.forEach(_section => {
                filteredImage = _section.images.filter(_image => _image.publicId == imageData.publicId)
                if (filteredImage.length > 0) {
                    imageFound++
                    sectionFound = _section.name

                }
            })

            expect(imageFound).to.equal(1)
            expect(sectionFound).to.equal(data.section)
            expect(filteredImage[0].description).to.equal(data.description)
        })

        it('should succeed on editing the section of an image', async () => {

            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description1`,
                publicId: `testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description2`,
                publicId: `testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description3`,
                publicId: `testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: imageData.description,
                section: 'screenprinting'
            }
            const res = await logic.editImage(imageData.publicId, data)
            expect(res).to.not.exist

            const _portfolio = await Portfolio.find({})
            expect(_portfolio.length).to.equal(1)

            let imageFound = []
            let filteredImage = []
            let sectionFound = ''
            _portfolio[0].sections.forEach(_section => {
                filteredImage = _section.images.filter(_image => _image.publicId == imageData.publicId)
                if (filteredImage.length > 0) {
                    imageFound = filteredImage
                    sectionFound = _section.name
                }
            })

            expect(sectionFound).to.equal(data.section)
            expect(imageFound.length).to.equal(1)
            expect(imageFound[0].description).to.equal(data.description)
        })

        it('should fail on publicId not found', async () => {
            try {
                await logic.addImage(imageData)
                random = Math.random()
                imageData = {
                    description: `test description1`,
                    publicId: `testPublicId${random}`,
                    section: 'other',
                    url: `http://testimageurl.com/${random}`
                }
                await logic.addImage(imageData)
                random = Math.random()
                imageData = {
                    description: `test description2`,
                    publicId: `testPublicId${random}`,
                    section: 'other',
                    url: `http://testimageurl.com/${random}`
                }
                await logic.addImage(imageData)
                random = Math.random()
                imageData = {
                    description: `test description3`,
                    publicId: `testPublicId${random}`,
                    section: 'other',
                    url: `http://testimageurl.com/${random}`
                }
                await logic.addImage(imageData)
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                imageData.publicId = 'notFoundPublicId'
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`The image you want to edit doesn't exist in your portfolio`)
            }
        })

        it('should fail on not valid publicId', async () => {
            try {
                imageData.publicId = 2
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId ${imageData.publicId} is not a string`)
            }
        })

        it('should fail on undefined publicId', async () => {
            try {
                imageData.publicId = undefined
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        it('should fail on null publicId', async () => {
            try {
                imageData.publicId = null
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        it('should fail on empty publicId', async () => {
            try {
                imageData.publicId = ''
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is empty`)
            }
        })

        it('should fail on undefined description', async () => {
            try {
                const data = {
                    description: undefined,
                    section: imageData.section
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is not optional`)
            }
        })

        it('should fail on null description', async () => {
            try {
                const data = {
                    description: null,
                    section: imageData.section
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is not optional`)
            }
        })

        it('should fail on empty description', async () => {
            try {
                const data = {
                    description: '',
                    section: imageData.section
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is empty`)
            }
        })

        it('should fail on undefined section', async () => {
            try {
                const data = {
                    description: imageData.description,
                    section: undefined
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })

        it('should fail on null section', async () => {
            try {
                const data = {
                    description: imageData.description,
                    section: null
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })

        it('should fail on empty section', async () => {
            try {
                const data = {
                    description: imageData.description,
                    section: ''
                }
                await logic.editImage(imageData.publicId, data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is empty`)
            }
        })
    })

    xdescribe('getImages', () => {
        it('should succeed on getting the entire protfolio', async () => {
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId1`,
                section: 'science',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId2`,
                section: 'screenprinting',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId3`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: "new description",
                section: imageData.section
            }

            const res = await logic.getImageList()
            expect(res).to.exist
            expect(res.sections).to.be.instanceOf(Array)
            expect(res.sections.length).to.equal(4)
            let foundOther = false
            let foundScreenprinting = false
            let foundScience = false
            let foundIlustration = false
            res.sections.forEach(section => {
                if (section.name == 'other' && section.images.length == 2) {
                    foundOther = true
                }
                if (section.name == 'ilustration'  && section.images.length == 0){
                    foundIlustration = true
                }
                if (section.name == 'science' && section.images.length == 1){
                    foundScience = true
                }
                if (section.name == 'screenprinting' && section.images.length == 1){
                    foundScreenprinting = true
                }
            })
            expect(foundIlustration).to.equal(true)
            expect(foundOther).to.equal(true)
            expect(foundScience).to.equal(true)
            expect(foundScreenprinting).to.equal(true)
        })

        it('should succeed on getting ilustrations from "other" section', async () => {
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId1`,
                section: 'science',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId2`,
                section: 'screenprinting',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId3`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: "new description",
                section: imageData.section
            }

            section='other'
            const res = await logic.getImageList(section)
            expect(res).to.exist
            expect(res.sections).to.not.exist
            expect(res.name).to.exist
            expect(res.name).to.equal(section)
            expect(res.images).to.exist
            expect(res.images).to.be.instanceOf(Array)
            expect(res.images.length).to.equal(2)
        })

        it('should succeed on getting ilustrations from "science" section', async () => {
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId1`,
                section: 'science',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId2`,
                section: 'screenprinting',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId3`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: "new description",
                section: imageData.section
            }

            section='science'
            const res = await logic.getImageList(section)
            expect(res).to.exist
            expect(res.sections).to.not.exist
            expect(res.name).to.exist
            expect(res.name).to.equal(section)
            expect(res.images).to.exist
            expect(res.images).to.be.instanceOf(Array)
            expect(res.images.length).to.equal(1)
        })

        it('should succeed on getting ilustrations from "screenprinting" section', async () => {
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId1`,
                section: 'science',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId2`,
                section: 'screenprinting',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId3`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: "new description",
                section: imageData.section
            }

            section='screenprinting'
            const res = await logic.getImageList(section)
            expect(res).to.exist
            expect(res.sections).to.not.exist
            expect(res.name).to.exist
            expect(res.name).to.equal(section)
            expect(res.images).to.exist
            expect(res.images).to.be.instanceOf(Array)
            expect(res.images.length).to.equal(1)
        })

        it('should succeed on getting ilustrations from "ilustration" section', async () => {
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId1`,
                section: 'science',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId2`,
                section: 'screenprinting',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            random = Math.random()
            imageData = {
                description: `test description${random}`,
                publicId: `testPublicId3`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImage(imageData)
            const data = {
                description: "new description",
                section: imageData.section
            }

            section='ilustration'
            const res = await logic.getImageList(section)
            expect(res).to.exist
            expect(res.sections).to.not.exist
            expect(res.name).to.exist
            expect(res.name).to.equal(section)
            expect(res.images).to.exist
            expect(res.images).to.be.instanceOf(Array)
            expect(res.images.length).to.equal(0)
        })

        it('should fail on not valid section', async () => {
            try {
                await logic.getImageList('notValidSection')
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`notValidSection is not a valid section`)
            }
        })

        it('should fail on null publicId', async () => {
            try {
                await logic.getImageList(null)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })
    })
    after(async () => {
        mongoose.disconnect()
    })
})