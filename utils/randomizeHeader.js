const randomize = () => {
    const randColor = Math.floor(Math.random() * 3);
    let color = '#f5e3ae';
    let textColor = '#353534';
    switch (randColor) {
        case 0:
            color = '#f5e3ae';
            textColor = '#353534'
            break;
        case 1:
            color = '#721133'
            textColor = '#D8D8D8'
            break;
        case 2:
            color = '#134153'
            textColor = '#D8D8D8'
            break;
        case 3:
            color = '#2e828b'
            textColor = '#353534'
            break;
        default:
            break;
    }
    const randImage = Math.floor(Math.random() * 4);
    let image = 'images/mainLogo1.png';
    switch (randImage) {
        case 0:
            textColor == '#353534' ?
                image = 'images/mainLogo1.png'
                :
                image = 'images/mainLogo1light.png'
            break;
        case 1:
            textColor == '#353534' ?
                image = 'images/mainLogo2.png'
                :
                image = 'images/mainLogo2light.png'
            break;
        case 2:
            textColor == '#353534' ?
            image = 'images/mainLogo3.png'
            :
            image = 'images/mainLogo3light.png'
            break;
        case 3:
            textColor == '#353534' ?
            image = 'images/mainLogo4.png'
            :
            image = 'images/mainLogo4light.png'
            break;
        default:
            break;
    }
    return {textColor, image, color}
}

export default randomize