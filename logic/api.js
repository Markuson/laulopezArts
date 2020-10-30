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
    getImageList() {
        return (async () => {
            try {

            } catch (error) {
                return error.message
            }
        })();

    },

    addImage(newImageData) {

        const { description, publicId, section, url } = newImageData

        validate.arguments([
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'section', value: section, type: 'string', notEmpty: true },
            { name: 'url', value: url, type: 'string', notEmpty: true }
        ])
        validate.url(url)

        return (async () => {
            try {
                let _portfolio = await Portfolio.findOne({})
                if (_portfolio==null) {
                    await Portfolio.create({sections:new Sections({ name: section })})
                    _portfolio = await Portfolio.findOne({})
                }

                let _section = await Portfolio.findOne({ 'sections.name': section })
                if (_section==null) {
                    _portfolio.sections.push(new Sections({ name: section }))
                    await Portfolio.findByIdAndUpdate(_portfolio.id, _portfolio)
                    _portfolio = await Portfolio.findOne()
                }

                _portfolio.sections.forEach(__section => {
                    const filteredImages = __section.images.filter(_image=>_image.url==url)
                    const _filteredImages =  __section.images.filter(_image=>_image.publicId==publicId)
                    if (filteredImages.length > 0 || _filteredImages.length > 0 ) {
                        throw new LogicError(`The the image you want to add already exists in your portfolio!`)
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

    deleteImage(data) {
        // validate
        // const { publicId } = data
        // let deleted = false
        // let found = false

        // return (async () => {
        //     try {
        //         const result = await cloudinary.uploader.destroy(publicId);
        //         if(result.result=='ok'){
        //             const [, imageId] = publicId.split('/')
        //             const imageList = await this.getImageList()
        //             imageList.forEach(list => {
        //                 if (!deleted) {
        //                     let index = list.images.findIndex(image => image.id == imageId)
        //                     if (index != -1) {
        //                         list.images.splice(index, 1)
        //                         deleted = true
        //                     }
        //                 }
        //             });
        //             await this.setImageList(imageList)
        //         }
        //         if (deleted) return { status: 'OK', message: 'image deleted' }
        //         return { status: 'ERROR', message: 'image not found' }
        //     } catch (error) {
        //         if (error.message == undefined) return { status: 'ERROR', message: error }
        //         return { status: 'ERROR', message: error.message }
        //     }
        // })();
    },

    editImage(imageId, data) {
        // const { description, section } = data
        // let imageFound = false
        // let index = -1
        // return (async () => {
        //     try {
        //         const imageList = await this.getImageList()
        //         imageList.forEach(list => {
        //             if (!imageFound) {
        //                 if (index == -1) index = list.images.findIndex(image => image.id == imageId)
        //                 if (index > -1) {
        //                     if (section == list.section || !section) {
        //                         description ? list.images[index].description = description : false
        //                     } else {
        //                         const editedImage = list.images.splice(index, 1)
        //                         imageList.forEach(list => {
        //                             if (list.section == section) list.images.push(editedImage[0])
        //                         })
        //                     }
        //                     imageFound = true
        //                 }
        //             }
        //         })
        //         if (imageFound) await this.setImageList(imageList)
        //         if (imageFound) return { status: 'OK', message: 'image edited' }
        //         return { status: 'ERROR', message: 'image not found' }
        //     } catch (error) {
        //         return { status: 'ERROR', message: error.message }
        //     }
        // })()
    },
}
// export default logic
module.exports = logic
