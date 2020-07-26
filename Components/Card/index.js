import {Image, Transformation} from 'cloudinary-react';


export default function Card({
    description,
    height = 500,
    id,
    publicId,
    url
}) {

    return <div className="uk-box-shadow-hover-large uk-animation-fade " tabIndex="0">
            <a href={url} data-caption={description}>
                <div id={id} className="uk-text-center">
                    {/* <img src={src} /> */}
                    <Image publicId={publicId} alt={description}>
                    <Transformation quality="auto" height={height} crop="fill" />
                            </Image>
                </div>
            </a>
    </div>
}
