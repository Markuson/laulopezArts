const validate = require('validate')
const { LogicError } = require('errors')
const { models } = require('data')
const cloudinary = require('cloudinary').v2
const transporter = require('../utils/nodemailer')
require('dotenv').config()

const { Portfolio, Images, Sections, Workshops } = models

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const logic = {
    addImage(newImageData) {

        const { description, publicId, section, url } = newImageData
        validate.arguments([
            { name: 'description', value: description, type: 'string' },
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
        const { publicId, description, section } = imageData
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string' },
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

                await Portfolio.findOneAndUpdate({ _id: _portfolio.id }, _portfolio)

            } catch (error) {
                throw new LogicError(error.message)
            }
        })();
    },

    addWorkshop(newWorkshopData) {
        const { title, subtitle, description, price, place, included, other, images, video } = newWorkshopData
        validate.arguments([
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'subtitle', value: subtitle, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'price', value: price, type: 'string', notEmpty: false, optional: true },
            { name: 'place', value: place, type: 'string', notEmpty: false, optional: true },
            { name: 'included', value: included, type: 'string', notEmpty: false, optional: true },
            { name: 'other', value: other, type: 'string', notEmpty: false, optional: true },
            { name: 'images', value: images, type: 'object', notEmpty: true },
            { name: 'video', value: video, type: 'string', notEmpty: false, optional: true },
        ])
        validate.url(video)

        return (async () => {
            try {
                await Workshops.create({
                    title,
                    subtitle,
                    description,
                    price,
                    place,
                    included,
                    other,
                    images,
                    video,
                    date:Date.now()
                })
            } catch (error) {
                throw new LogicError(error.message)
            }

        })();

    },

    editWorkshop(workshopData) {
        const { id, title, subtitle, description, price, place, included, other, images, video } = workshopData
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'subtitle', value: subtitle, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'price', value: price, type: 'string', notEmpty: false, optional: true },
            { name: 'place', value: place, type: 'string', notEmpty: false, optional: true },
            { name: 'included', value: included, type: 'string', notEmpty: false, optional: true },
            { name: 'other', value: other, type: 'string', notEmpty: false, optional: true },
            { name: 'images', value: images, type: 'array', notEmpty: true },
            { name: 'video', value: video, type: 'string', notEmpty: false, optional: true },
        ])
        validate.url(video)

        return (async () => {
            try {
                let _workshop = await Workshops.findOne({'id': id})
                if (_workshop == null) {
                    throw new LogicError(`Workshop not found`)
                }
                _workshop = {
                    title,
                    subtitle,
                    description,
                    price,
                    place,
                    included,
                    other,
                    images,
                    video
                }
                await Workshops.findOneAndUpdate({ _id: id }, _workshop)
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
                let response = await Portfolio.deleteOne({ _id: id })
                console.log(response)
            } catch (error) {
                throw new LogicError(error.message)
            }

        })();
    },

    deleteWorkshop(publicId) {
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                let response = await Workshops.deleteOne({ _id: id })
                console.log(response)
            } catch (error) {
                throw new LogicError(error.message)
            }

        })();
    },

    nodemailerSend(email, subject, text) {
        validate.arguments([
            { name: 'subject', value: subject, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true }
        ])
        validate.email(email)

        const message = {
            from: email,
            to: process.env.EMAIL,
            subject: `LAULOPEZARTS.COM --> FROM: ${email}, SUBJECT: ${subject}`,
            text,
            replyTo: email
        };

        return (async () => {
            try {
                const response = await transporter.sendMail(message)
                if (response.accepted.length > 0) return { status: "OK", description: "email sent" }
                else return { status: "error", description: "error sending email" }
            } catch (error) {
                throw new Error(error.message)
            }
        })();
    }
}
// export default logic
module.exports = logic
