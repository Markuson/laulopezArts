const axios = require('axios')

const logic = {

    getImages(section = undefined) {
        let url = `/api/admin/images`
        let result =[]
        let sorted = []
        return (async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                response.data.forEach(({ section: _section, images }) => {
                    if (section == undefined || section == _section){
                        images.forEach(image => {
                            result.push(image)
                        })
                    }
                })
                result = result.sort((a, b) => {
                    const time1 = a.timestamp;
                    const time2 = b.timestamp;

                    let comparison = 0;
                    if (time1 > time2) {
                      comparison = -1;
                    } else if (time1 < time2) {
                      comparison = 1;
                    }
                    return comparison;
                })

                return result
            }
            catch (e) {
                return e.message
            }
        })();
    },

    addImageData(data) {
        return (async () => {
            let url = `/api/admin/image/${data.id}`
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
        return (async () => {
            let url = `/api/admin/image/${id}`
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

    deleteImageData(id) {
        return (async () => {
            let url = `/api/admin/image/${id}`
            try {
                const response = await axios({
                    method: 'delete',
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                return response
            }
            catch (e) {
                return e.message
            }
        })();
    },

    saveImageData(response, folder, description) {
        const { body: { public_id, secure_url } } = response

        console.log(`public id: ${public_id}, url: ${secure_url},folder: ${folder}, description: ${description}`)
    }
}

export default logic;