import { Image, Transformation } from 'cloudinary-react';


export default function WorkshopCard({
    buttonTitle = "+ INFO",
    color,
    height = 200,
    id,
    imageId,
    onClick,
    subtitle,
    title
}) {

    return <div>
        <div className="uk-card uk-card-default uk-card-media-top">
            <div id={id} className="uk-text-center">
                <Image publicId={imageId} alt={subtitle}>
                    <Transformation quality="auto" height={height} crop="scale" />
                </Image>
            </div>
            <div>
                <div className="uk-card-body">
                    <h3 className="uk-card-title uk-text-center">{title}</h3>
                    <p className="uk-text-center">
                        {subtitle}
                    </p>
                </div>
                <div style={{ backgroundColor: color }} className="uk-card-footer uk-text-center">
                    <a className="uk-button uk-button-text" onClick={() => onClick()}>
                        <strong>{buttonTitle}</strong>
                    </a>
                </div>
            </div>
        </div>
    </div>
}
