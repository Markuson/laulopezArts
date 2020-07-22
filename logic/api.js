const jsonfile = require('jsonfile')

const logic = {
    getImageList() {
        const file = `./public/docs/imageList.json`

        return (async() => {
            try {
                const response = jsonfile.readFile(file)
                return response
            } catch (error) {
                throw Error(error.message)
            }
        })()
    },

    setImageList(imageList) {
        //check imageList. it must be an array of objects...
        const file = `./public/docs/imageList.json`

        return (async () => {
            try {
                const response = await jsonfile.writeFile(file, imageList, { spaces: 2, EOL: '\r\n' })
                return response
            } catch (error) {
                throw Error(error.message)
            }
        })();
    },

    addImage(newImageData) {
        //check newImageData is an object and has the data you need..... check newImageData.section is ok, id shoud be lowercase

        const {description, id, section, url} = newImageData
        let sectionFound = false
        let existingId = 0
        return (async () => {
            try {
                const imageList = await this.getImageList()
                imageList.forEach(element => existingId = element.images.find(element => element.id == id))
                if (!existingId){
                    imageList.forEach(element => {
                        if(element.section === section){
                            element.images.push({id, url, description})
                            sectionFound = true
                        }
                    });
                    await this.setImageList(imageList)
                }

                if (!sectionFound && existingId) return {status: 'ERROR', message: 'duplicated Id'}
                if (sectionFound) return {status: 'OK', message: 'image added'}
                return {status: 'ERROR', message: 'section not found'}
            } catch (error) {
                return {status: 'ERROR', message: error.message}
            }
        })()
    },

    deleteImage(imageId){
        let deleted = false
        return (async () => {
            try {
                const imageList = await this.getImageList()
                imageList.forEach(element => {
                    if(!deleted){
                        let index = element.images.findIndex(image =>image.id==imageId)
                        if (index != -1){
                            element.images.splice(index,1)
                            deleted = true
                        }
                    }
                });
                await this.setImageList(imageList)

                if (deleted) return {status: 'OK', message: 'image deleted'}
                return {status: 'ERROR', message: 'image not found'}
            } catch (error) {
                return {status: 'ERROR', message: error.message}
            }
        })()
    },

    editImage(imageId, data){

    }
}
export default logic
