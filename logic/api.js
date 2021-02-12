const validate = require('validate')
const { LogicError } = require('errors')
const { models } = require('data')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

const { Portfolio, Images, Sections } = models
// const jsonfile = require('jsonfile')

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const logic = {
    addImage(newImageData) {

        const { description, publicId, section, url } = newImageData
        validate.arguments([
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'section', value: section, type: 'string', notEmpty: true },
            { name: 'url', value: url, type: 'string', notEmpty: true }
        ])
        validate.url(url)

        if (section != 'ilustration' &&
            section != 'screenprinting' &&
            section != 'science' &&
            section != 'other' &&
            section != 'all') {
            throw new LogicError(`${section} is not a valid section`)
        }

        return (async () => {
            try {
                let _portfolio = await Portfolio.findOne({})
                if (_portfolio == null) {
                    const sections = [
                        new Sections({ name: 'ilustration' }),
                        new Sections({ name: 'screenprinting' }),
                        new Sections({ name: 'science' }),
                        new Sections({ name: 'other' })
                    ]
                    await Portfolio.create({ sections })
                    _portfolio = await Portfolio.findOne({})
                }

                let _section = await Portfolio.findOne({ 'sections.name': section })
                if (_section == null) {
                    _portfolio.sections.push(new Sections({ name: section }))
                    await Portfolio.findByIdAndUpdate(_portfolio.id, _portfolio)
                    _portfolio = await Portfolio.findOne()
                }

                _portfolio.sections.forEach(__section => {
                    const filteredImages = __section.images.filter(_image => _image.url == url)
                    const _filteredImages = __section.images.filter(_image => _image.publicId == publicId)
                    if (filteredImages.length > 0 || _filteredImages.length > 0) {
                        throw new LogicError(`The image you want to add already exists in your portfolio`)
                    }
                })

                const sectionIndex = _portfolio.sections.findIndex(___section => ___section.name == section)

                _portfolio.sections[sectionIndex].images.push(new Images({ description, publicId, url, date: Date.now() }))

                await Portfolio.findByIdAndUpdate(_portfolio.id, _portfolio)

            } catch (error) {
                throw new LogicError(error.message)
            }

        })();

    },

    deleteImage(publicId) {
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                let _portfolio = await Portfolio.findOne({})
                if (_portfolio == null) {
                    throw new LogicError(`The image you want to delete doesn't exist in your portfolio`)
                }
                let _sections = []
                let imageFound = false
                _portfolio.sections.forEach(_section => {
                    const oldImagesLength = _section.length
                    const filteredImages = _section.images.filter(_image => _image.publicId != publicId)
                    if (oldImagesLength != filteredImages.length) {
                        imageFound = true
                    }
                    _sections.push({ name: _section.name, _id: _section.id, images: filteredImages })
                })
                if (!imageFound) throw new LogicError(`The image you want to delete doesn't exist in your portfolio`)
                _portfolio.sections = _sections

                await Portfolio.findByIdAndUpdate(_portfolio.id, _portfolio)

            } catch (error) {
                throw new LogicError(error.message)
            }

        })();
    },

    editImage(imageData) {
        const {publicId, description, section } = imageData
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'section', value: section, type: 'string', notEmpty: true },
        ])

        if (section != 'ilustration' &&
            section != 'screenprinting' &&
            section != 'science' &&
            section != 'other') {
            throw new LogicError(`${section} is not a valid section`)
        }

        return (async () => {
            try {
                let _portfolio = await Portfolio.findOne({})
                if (_portfolio == null) {
                    throw new LogicError(`Portfolio not found`)
                }

                let imageFound = false
                _portfolio.sections.forEach(_section => {
                    if (imageFound == false) {
                        if (_section.name == section) {
                            _section.images.forEach(_image => {
                                if (_image.publicId == publicId) {
                                    _image.description = description
                                    imageFound = true
                                }
                            })
                        } else {
                            const filteredImage = _section.images.filter(_image => _image.publicId == publicId)
                            if (filteredImage.length > 0) {
                                _oldSection = _section.name
                                imageFound = true
                                const oldSectionIndex = _portfolio.sections.findIndex(__section => __section.name == _oldSection)
                                const imageIndex = _portfolio.sections[oldSectionIndex].images.findIndex(__image => __image.publicId == publicId)
                                _portfolio.sections[oldSectionIndex].images.splice(imageIndex, 1)
                                let newSectionIndex = _portfolio.sections.findIndex(_newSection => _newSection.name == section)
                                if (newSectionIndex == -1) {
                                    _portfolio.sections.push(new Sections({ name: section }))
                                    newSectionIndex = _portfolio.sections.findIndex(_newSection => _newSection.name == section)
                                    if (newSectionIndex == -1) throw new LogicError(`The new section doesn't exist in your portfolio`)
                                }
                                _portfolio.sections[newSectionIndex].images.push(filteredImage[0])
                            }
                        }
                    }
                })

                if (!imageFound) throw new LogicError(`The image you want to edit doesn't exist in your portfolio`)

                await Portfolio.findOneAndUpdate({_id: _portfolio.id}, _portfolio)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })();
    },
}
// export default logic
module.exports = logic
