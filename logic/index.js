const axios = require('axios')

const logic = {

    getPhotos(tag = undefined) {
        return (async () => {
            let url = ``
            if (tag != undefined){
                url=`https://res.cloudinary.com/marcuson/image/list/`
            }else{
                url=`https://res.cloudinary.com/marcuson/image/list/`
            }
            try {
                const response = await axios({
                    method:'get',
                    url,
                    headers:{
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

    deleteImageData () {

    },

    saveImageData (response, folder, description) {
        const {body:{public_id, secure_url}} = response

        console.log(`public id: ${public_id}, url: ${secure_url},folder: ${folder}, description: ${description}`)
    },

    getImageList () {

    }
}

export default logic;