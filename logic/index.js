const axios = require('axios')
const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g

const logic = {
    extractPhotos(content) {
        const links = new Set()
        let match
        while (match = regex.exec(content)) {
            links.add(match[1])
        }
        return Array.from(links)
    },

    getAlbum(id) {
        return (async () => {
            try {
                const response = await axios({
                    method:'get',
                    url:`https://photos.app.goo.gl/${id}`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000/'
                    },
                })
                return this.extractPhotos(response.data)
            }
            catch (e) {
                return e.message
            }
        })();
    },
}

export default logic;