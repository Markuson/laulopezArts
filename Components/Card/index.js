import {Image} from 'cloudinary-react';


export default function Card({
    description,
    id,
    publicId,
    url
}) {

    return <div className="uk-box-shadow-hover-large uk-animation-fade " tabIndex="0">
            <a href={url} data-caption={description}>
                <div id={id} className="uk-text-center">
                    {/* <img src={src} /> */}
                    <Image publicId={publicId}/>
                </div>
            </a>
    </div>
}
