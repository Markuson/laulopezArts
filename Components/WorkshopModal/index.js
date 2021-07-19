import { Image, Transformation } from 'cloudinary-react';

export default function WorkshopModal({
    description,
    included,
    images,
    onClose,
    onGoToContact,
    other,
    place,
    price,
    title,
    video
}) {
    const handleGoToContact = (e) => {
        e.preventDefault();
        onGoToContact(e);
    }

    return (
        <div id="workshop-modal" className="uk-modal-container" data-uk-modal>
            <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <div className="uk-margin">
                    <h2 className="uk-text-center">{title}</h2>
                    <div id="slideshow" style={{ maxWidth: "640px", margin: "auto" }} className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" data-uk-slideshow="">
                        <ul  className="uk-slideshow-items">
                            {
                                images.map((image, index) => {
                                    return <li id={index} key={index}>
                                        <Image publicId={image.publicId} alt={`${title}${index}`}>
                                            <Transformation quality="auto" height={300} crop="scale" />
                                        </Image>
                                    </li>
                                })
                            }
                            {!!video &&
                                <li key="video">
                                    <iframe
                                        src={`https://player.vimeo.com/video/${video}?muter=1&autoplay=1&loop=1&title=0&byline=0&portrait=0`}
                                        width="640"
                                        height="360"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        data-uk-cover
                                    />
                                </li>
                            }
                        </ul>
                        <a className="uk-position-center-left uk-position-small" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a>
                        <a className="uk-position-center-right uk-position-small" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>
                        <ul className="uk-slideshow-nav uk-dotnav"></ul>
                    </div>
                    {

                        description.split("\n").map((text, index) => {
                            return <p key={index} className="uk-text-justify uk-padding uk-padding-remove-vertical">
                                {text}
                            </p>
                        })
                    }
                    <div className="uk-padding uk-padding-remove-vertical">
                        <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                            <strong>Precio: </strong>{price}
                        </p>
                        <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                            <strong>Lugar: </strong>{place}
                        </p>
                        <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                            <strong>Material incluido: </strong> {!included.includes('\n') && included}<br />
                        </p>
                        {included.includes('\n') && included.split("\n").map((text, index) => {
                            return <p key={index} className="uk-text-meta uk-text-justify uk-padding-small uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>·</strong> {text}
                            </p>
                        })
                        }
                        {other.split("\n").map((text, index) => {
                            return <p key={index} className="uk-text-justify uk-padding-remove-vertical">
                                {text}
                            </p>
                        })
                        }
                    </div>
                    <div className="uk-card-footer uk-text-center">
                        <a className="uk-button uk-button-default" onClick={handleGoToContact}>contactar</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
