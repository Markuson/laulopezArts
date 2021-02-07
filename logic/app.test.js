require('dotenv').config()
const { expect } = require('chai')
const logic = require('./app')

let random = Math.random()

let imageData = {
    description: `test description${random}`,
    publicId: `other/testPublicId${random}`,
    section: 'other',
    url: `http://testimageurl.com/${random}`
}

describe('Logic', () => {

    beforeEach(async () => {
        imageData = {
            description: 'test description beforeEach',
            publicId: `other/testPublicId${String(Math.random())}`,
            section: 'other',
            url: `vhttp://testimageurl.com/${String(Math.random())}`
        }
    })

    xdescribe('addImageData', () => {
        it('should succeed on adding an image on "other" section', async () => {

            const res = await logic.addImageData(imageData)
            expect(res.data).to.exist

            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image added')

        })

        it('should succeed on adding an image on "ilustration" section', async () => {
            imageData.section = "ilustration"
            const res = await logic.addImageData(imageData)
            expect(res.data).to.exist

            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image added')

        })

        it('should succeed on adding an image on "screenprinting" section', async () => {
            imageData.section = "screenprinting"
            const res = await logic.addImageData(imageData)
            expect(res.data).to.exist

            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image added')
        })

        it('should succeed on adding an image on "science" section', async () => {
            imageData.section = "science"
            const res = await logic.addImageData(imageData)
            expect(res.data).to.exist

            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image added')
        })

        it('should succeed on adding two images on diferent sections', async () => {

            const res = await logic.addImageData(imageData)
            expect(res.data).to.exist

            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image added')

            imageData.section = 'screenprinting'
            imageData.url = `http://testimageurl2.com${Math.random()}`
            imageData.publicId = `testPublicId2${Math.random()}`

            const res2 = await logic.addImageData(imageData)
            expect(res.data).to.exist

            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image added')
        })

        it('should fail on repeated url image on same section', async () => {

            await logic.addImageData(imageData)
            const res = await logic.addImageData(imageData)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal('The image you want to add already exists in your portfolio')
        })

        it('should fail on repeated url image on different section', async () => {
            await logic.addImageData(imageData)
            imageData.section = 'screenprinting'
            const res = await logic.addImageData(imageData)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal('The image you want to add already exists in your portfolio')
        })

        it('should fail on repeated publicId on same section', async () => {
            await logic.addImageData(imageData)
            imageData.url = 'http://testimageurl2.com'
            const res = await logic.addImageData(imageData)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal('The image you want to add already exists in your portfolio')
        })

        it('should fail on repeated publicId on different section', async () => {
            await logic.addImageData(imageData)
            imageData.url = 'http://testimageurl2.com'
            imageData.section = 'screenprinting'
            const res = await logic.addImageData(imageData)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal('The image you want to add already exists in your portfolio')
        })

        it('should fail on not valid section', async () => {
            imageData.section = 'noValidSection'
            const res = await logic.addImageData(imageData)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal(`${imageData.section} is not a valid section`)
        })

        it('should fail on undefined section', async () => {
            try {
                imageData.section = undefined
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })

        it('should fail on null section', async () => {
            try {
                imageData.section = null
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is not optional`)
            }
        })

        it('should fail on empty section', async () => {
            try {
                imageData.section = ''
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is empty`)
            }
        })

        it('should fail on not valid publicId', async () => {
            try {
                imageData.publicId = 2
                await logic.addImageData(imageData)
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
                await logic.addImageData(imageData)
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
                await logic.addImageData(imageData)
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
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is empty`)
            }
        })

        it('should fail on not valid description', async () => {
            try {
                imageData.description = 2
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description ${imageData.description} is not a string`)
            }
        })

        it('should fail on undefined description', async () => {
            try {
                imageData.description = undefined
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is not optional`)
            }
        })

        it('should fail on null description', async () => {
            try {
                imageData.description = null
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is not optional`)
            }
        })

        it('should fail on empty description', async () => {
            try {
                imageData.description = ''
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is empty`)
            }
        })

        it('should fail on not valid url', async () => {
            try {
                imageData.url = 'not an url'
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`${imageData.url} is not a url`)
            }
        })

        it('should fail on undefined url', async () => {
            try {
                imageData.url = undefined
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`${imageData.url} is not a url`)
            }
        })

        it('should fail on null url', async () => {
            try {
                imageData.url = null
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`${imageData.url} is not a url`)
            }
        })

        it('should fail on empty url', async () => {
            try {
                imageData.url = ''
                await logic.addImageData(imageData)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`${imageData.url} is not a url`)
            }
        })


    })

    describe('deleteImage', () => {
        it('should succeed on deleting an image', async () => {

            await logic.addImageData(imageData)
            const res = await logic.deleteImageData(imageData.publicId)
            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image deleted')
        })

        it('should succeed on deleting an image', async () => {

            const firstPublicId = imageData.publicId
            await logic.addImageData(imageData)

            imageData = {
                description: 'test description1',
                publicId: 'other/testPublicId2',
                section: 'other',
                url: 'http://testimageurl2.com'
            }
            await logic.addImageData(imageData)

            imageData = {
                description: 'test description2',
                publicId: 'screenprinting/testPublicId3',
                section: 'screenprinting',
                url: 'http://testimageurl3.com'
            }
            await logic.addImageData(imageData)

            imageData.publicId = firstPublicId
            const res = await logic.deleteImageData(imageData.publicId)
            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image deleted')
        })

        it('should fail on publicId not found', async () => {
            imageData.publicId = 'notFoundPublicId'
            const res = await logic.deleteImageData(imageData.publicId)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal(`The image you want to delete doesn't exist in your portfolio`)
        })

        it('should fail on not valid publicId', async () => {
            try {
                imageData.publicId = 2
                await logic.deleteImageData(imageData.publicId)
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
                await logic.deleteImageData(imageData.publicId)
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
                await logic.deleteImageData(imageData.publicId)
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
                await logic.deleteImageData(imageData.publicId)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is empty`)
            }
        })
    })

    xdescribe('editImageData', () => {
        it('should succeed on editing the description of an image', async () => {
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description1`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description2`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description3`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            const data = {
                publicId: imageData.publicId,
                description: "new description",
                section: imageData.section
            }
            console.log(data.publicId)
            const res = await logic.editImageData(data)
            console.log(res.data)
            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image edited')
        })

        it('should succeed on editing the section of an image', async () => {

            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description4`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description5`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description6`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            const data = {
                publicId: imageData.publicId,
                description: imageData.description,
                section: 'screenprinting'
            }
            const res = await logic.editImageData(data)
            expect(res.data.status).to.equal('OK')
            expect(res.data.message).to.equal('Image edited')
        })

        it('should fail on publicId not found', async () => {
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description7`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description8`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            random = Math.random()
            imageData = {
                description: `test description9`,
                publicId: `other/testPublicId${random}`,
                section: 'other',
                url: `http://testimageurl.com/${random}`
            }
            await logic.addImageData(imageData)
            const data = {
                publicId: 'notFoundPublicId',
                description: imageData.description,
                section: 'screenprinting'
            }
            const res = await logic.editImageData(data)
            expect(res.data.status).to.equal('KO')
            expect(res.data.message).to.equal(`The image you want to edit doesn't exist in your portfolio`)
        })

        it('should fail on not valid publicId', async () => {
            try {
                imageData.publicId = 2
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                await logic.editImageData(data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        it('should fail on undefined publicId', async () => {
            try {
                imageData.publicId = undefined
                const data = {
                    description: imageData.description,
                    section: 'screenprinting'
                }
                await logic.editImageData(data)
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
                await logic.editImageData(data)
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
                await logic.editImageData(data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`publicId is not optional`)
            }
        })

        it('should fail on empty description', async () => {
            try {
                const data = {
                    publicId: imageData.publicId,
                    description: '',
                    section: imageData.section
                }
                await logic.editImageData(data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`description is empty`)
            }
        })

        it('should fail on empty section', async () => {
            try {
                const data = {
                    publicId: imageData.publicId, 
                    description: imageData.description,
                    section: ''
                }
                await logic.editImageData(data)
                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`section is empty`)
            }
        })
    })
})