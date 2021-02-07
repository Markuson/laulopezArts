const axios = require('axios')
const validate = require('validate')

const logic = {

    getImages(portfolio, section = undefined) {
        /**
         * TODO: Error handling (check portfolio is OK, check sections)
         */

         console.log(typeof portfolio)
        let images =[]

        portfolio.forEach(({ name: _section, images: _images }) => {
            if (section == undefined || section == _section){
                _images.forEach(image => {
                    images.push(image)
                })
            }
        })
        images = images.sort((a, b) => {
            const time1 = a.date;
            const time2 = b.date;

            let comparison = 0;
            if (time1 > time2) {
              comparison = -1;
            } else if (time1 < time2) {
              comparison = 1;
            }
            return comparison;
        })
        return images
    },

    addImageData(data) {
        const {publicId, description, section, url} = data
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'section', value: section, type: 'string', notEmpty: true },
        ])
        validate.url(url)
        const [,id] = publicId.split('/')
        return (async () => {
            let url = `/api/admin/image/${data.id}`
            // let url = `http://localhost:3000/api/admin/image/${id}` //FOR TESTING
            try {
                const response = await axios({
                    method: 'put',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        command: "add",
                        data
                    }
                })
                return response
            }
            catch (e) {
                return e.message
            }
        })();
    },

    editImageData(data) {
        const {publicId, description, section} = data
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true, optional: true },
            { name: 'section', value: section, type: 'string', notEmpty: true, optional: true },
        ])
        const [,id] = id.split('/')
        return (async () => {
            let url = `/api/admin/image/${id}`
            // let url = `http://localhost:3000/api/admin/image/${id}` //FOR TESTING
            try {
                const response = await axios({
                    method: 'put',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        command: "edit",
                        data
                    }
                })
                return response
            }
            catch (e) {
                return e.message
            }
        })();
    },

    deleteImageData(publicId) {
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
        ])
        const [,id] = publicId.split('/')
        return (async () => {
            let url = `/api/admin/image/${id}`
            // let url = `http://localhost:3000/api/admin/image/${id}` //FOR TESTING
            try {
                const response = await axios({
                    method: 'put',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        command: "delete",
                        data:{publicId}
                    }
                })
                return response
            }
            catch (e) {
                return e.message
            }
        })();
    },
}

export default logic
// module.exports = logic