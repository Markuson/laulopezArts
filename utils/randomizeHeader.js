const randomize = () => {
    const randColor = Math.floor(Math.random() * 3);
    let color = 'wheat';
    switch (randColor) {
        case 0:
            color = 'wheat';
            break;
        case 1:
            color = '#338F8E'
            break;
        case 2:
            color = '#CE93A9'
            break;
        default:
            break;
    }
    const randImage = Math.floor(Math.random() * 4);
    let image = 'images/mainLogo1.png';
    switch (randImage) {
        case 0:
            image = 'images/mainLogo1.png'
            break;
        case 1:
            image = 'images/mainLogo2.png'
            break;
        case 2:
            image = 'images/mainLogo3.png'
            break;
        case 3:
            image = 'images/mainLogo4.png'
            break;
        default:
            break;
    }
    return { image, color }
}

export default randomize