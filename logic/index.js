const logic = {

    getImages(portfolio, section = undefined) {
        /**
         * TODO: Error handling (check portfolio is OK, check sections)
         */

        let images =[]

        portfolio.forEach(({ section: _section, images: _images }) => {
            if (section == undefined || section == _section){
                _images.forEach(image => {
                    images.push(image)
                })
            }
        })
        images = images.sort((a, b) => {
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
        return images
    }
}

export default logic