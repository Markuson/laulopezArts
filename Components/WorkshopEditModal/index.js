import { useState } from 'react'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

export default function WorkshopEditModal({
    onDelete,
    onDescriptionChange,
    onIncludedChange,
    onOtherChange,
    onPlaceChange,
    onPriceChange,
    onSubtitleChange,
    onTitleChange,
    onVideoChange,
    onSubmit,
    description,
    images,
    inculded,
    other,
    place,
    price,
    subtitle,
    title,
    video,
    videoLink
}) {
    const [confirmDelete, setConfirmDelete] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
        e.target.workshopTitle.value = '';
        e.target.workshopVideo.value = '';
        e.target.workshopSubtitle.value = '';
        e.target.workshopDescription.value = '';
        e.target.workshopPlace.value = '';
        e.target.workshopPrice.value = '';
        e.target.workshopIncluded.value = '';
        e.target.workshopOther.value = '';
    }

    return (
        <CloudinaryContext cloudName="marcuson">

            <div id="edit-workshop-modal" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                    <button className="uk-modal-close-default" type="button" data-uk-close></button>
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
                                        src={`https://player.vimeo.com/video/${video}?muted=1&autoplay=1&loop=1&title=0&byline=0&portrait=0`}
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
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                        <fieldset className="uk-fieldset">
                            <div className="uk-margin uk-text-center">
                                <legend className="uk-legend" path="title">Editar Workshop:</legend>
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Video: (opcional)</label>
                                <input
                                    placeholder='https://linkAtuVideo.com/xxxx'
                                    className="uk-input"
                                    type="text"
                                    id="workshopVideo"
                                    value={videoLink}
                                    onChange={e => onVideoChange(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Título:</label>
                                <input
                                    className="uk-input"
                                    type="text"
                                    id="workshopTitle"
                                    value={title}
                                    onChange={e => onTitleChange(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Subtítulo:</label>
                                <input
                                    className="uk-input"
                                    type="text"
                                    id="workshopSubtitle"
                                    value={subtitle}
                                    onChange={e => onSubtitleChange(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Descripción:</label>
                                <textarea
                                    className="uk-input"
                                    type="text"
                                    id="workshopDescription"
                                    rows="5"
                                    value={description}
                                    onChange={e => onDescriptionChange(e.target.value)}
                                    style={{ resize: 'none', height: '120px' }}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Precio: (opcional)</label>
                                <input
                                    className="uk-input"
                                    type="text"
                                    id="workshopPrice"
                                    value={price}
                                    onChange={e => onPriceChange(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Lugar: (opcional)</label>
                                <input
                                    className="uk-input"
                                    type="text"
                                    id="workshopPlace"
                                    value={place}
                                    onChange={e => onPlaceChange(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Material incluido: (opcional)</label>
                                <textarea
                                    className="uk-input"
                                    type="text"
                                    id="workshopIncluded"
                                    rows="2"
                                    value={inculded}
                                    onChange={e => onIncludedChange(e.target.value)}
                                    style={{ resize: 'none', height: '80px' }}
                                />
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Otra info: (opcional)</label>
                                <textarea
                                    className="uk-input"
                                    type="text"
                                    id="workshopOther"
                                    rows="5"
                                    value={other}
                                    onChange={e => onOtherChange(e.target.value)}
                                    style={{ resize: 'none', height: '80px' }}
                                />
                            </div>
                            <div className="uk-margin uk-flex uk-flex-auto uk-flex-between uk-flex-middle">
                                <button type="button" onClick={() => setConfirmDelete(true)} className='uk-button uk-button-danger'>Borrar</button>
                                <button type="submit" className='uk-button uk-button-default'>Guardar</button>
                            </div>
                            {confirmDelete &&
                                <div className="uk-margin-small uk-flex uk-flex-column">
                                    <div className="uk-text-center" >
                                        <span className="uk-text-center">Seguro que quieres borrar la imagen? </span>
                                    </div>
                                    <div className="uk-margin uk-flex uk-flex-auto uk-flex-around uk-flex-middle">
                                        <button type="button" onClick={() => setConfirmDelete(false)} className='uk-button uk-button-default'>Cancela</button>
                                        <button type="button" onClick={() => { onDelete(); setConfirmDelete(false) }} className='uk-button uk-button-danger'>Confirma</button>
                                    </div>
                                </div>
                            }
                        </fieldset>
                    </form>
                </div>
            </div>
        </CloudinaryContext>
    )
}
