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

        const {description, id, publicId,section, url} = newImageData
        let sectionFound = false
        let index = -1
        return (async () => {
            try {
                const imageList = await this.getImageList()
                imageList.forEach(section =>{
                    if(index == -1) index = section.images.findIndex(image => image.id == id)
                })
                if (index==-1){
                    imageList.forEach(element => {
                        if(element.section === section){
                            element.images.push({id, url, publicId, description})
                            sectionFound = true
                        }
                    });
                    await this.setImageList(imageList)
                }

                if (!sectionFound && index > -1) return {status: 'ERROR', message: 'duplicated Id'}
                if (sectionFound) return {status: 'OK', message: 'image added'}
                return {status: 'ERROR', message: `section "${section}" not found`}
            } catch (error) {
                return {status: 'ERROR', message: error.message}
            }
        })()
    },

    deleteImage(imageId){
        //validate
        let deleted = false
        return (async () => {
            try {
                const imageList = await this.getImageList()
                imageList.forEach(list => {
                    if(!deleted){
                        let index = list.images.findIndex(image =>image.id==imageId)
                        if (index != -1){
                            list.images.splice(index,1)
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
        const { description, section } = data
        let imageFound = false
        let index = -1
        return (async () => {
            try {
                const imageList = await this.getImageList()
                imageList.forEach(list =>{
                    if(!imageFound){
                        if(index == -1) index = list.images.findIndex(image => image.id == imageId)
                        if (index > -1) {
                            if (section == list.section || !section){
                                description ? list.images[index].description = description : false
                            }else{
                                const editedImage = list.images.splice(index,1)
                                imageList.forEach(list => {
                                    if (list.section == section) list.images.push(editedImage[0])
                                })
                            }
                            imageFound = true
                        }
                    }
                })
                if (imageFound) await this.setImageList(imageList)
                if (imageFound) return {status: 'OK', message: 'image edited'}
                return {status: 'ERROR', message: 'image not found'}
            } catch (error) {
                return {status: 'ERROR', message: error.message}
            }
        })()
    }
}
export default logic
