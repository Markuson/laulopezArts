const axios = require('axios')
const validate = require('validate')

const logic = {

    getImages(portfolio, section = undefined) {
        /**
         * TODO: Error handling (check portfolio is OK, check sections)
         */

        let images =[]
        portfolio.forEach(({ name: _section, images: _images }) => {
            if (section == undefined || section == _section){
                _images.forEach(image => {
                    image.section = _section;
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
            { name: 'description', value: description, type: 'string'},
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

    editImageData(id, data) {
        const {publicId, description, section} = data
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', optional: true },
            { name: 'section', value: section, type: 'string', notEmpty: true, optional: true },
        ])
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

    deleteImage(publicId) {
        validate.arguments([
            { name: 'publicId', value: publicId, type: 'string', notEmpty: true },
        ])
        return (async () => {
            let url = `/api/admin/image/delete`
            // let url = `http://localhost:3000/api/admin/image/delete` //FOR TESTING
            try {
                const response = await axios({
                    method: 'put',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        data:{publicId}
                    }
                })
                if (response.data.data.result == 'not found') throw Error(response.data.data.result)
                return response
            }
            catch (e) {
                return e.message
            }
        })();
    },

    sendEmail(email, subject, text) {
        validate.email(email)

        validate.arguments([
            { name: 'subject', value: subject, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true }
        ])

        return (async () => {
            let url = `/api/contact` //FOR PRODUCTION
            // let url = `http://localhost:3030/api/contact` // FOR TESTING
            try {
                const response = await axios({
                    method: 'post',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        email,
                        subject,
                        text
                    }
                })
                return response.data
            }
            catch (e) {
                console.log(e)
                return e.message
            }
        })();

        return response;
    }
}

export default logic
// module.exports = logic