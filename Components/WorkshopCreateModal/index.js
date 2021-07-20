import ReactLoading from 'react-loading';

export default function WorkshopCreateModal({
    onDescriptionChange,
    onFileInput,
    onIncludedChange,
    onOtherChange,
    onPlaceChange,
    onPriceChange,
    onSubtitleChange,
    onTitleChange,
    onVideoChange,
    onSubmit,
    description,
    inculded,
    other,
    place,
    price,
    subtitle,
    title,
    uploadingWorkshop,
    video
}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    return (
        <div id="create-workshop-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin uk-text-center">
                            <legend className="uk-legend" path="title">Crear Workshop:</legend>
                        </div>
                        <div className="uk-margin uk-flex uk-flex-center">
                            <input
                                type="file"
                                id="workshopFileupload"
                                accept="image/*"
                                ref={_fileInput =>
                                    onFileInput(_fileInput)
                                }
                                multiple={true}
                            />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" >Video: (opcional)</label>
                            <input
                                placeholder='https://linkAtuVideo.com/xxxx'
                                className="uk-input"
                                type="text"
                                id="workshopVideo"
                                value={video}
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
                                style={{resize: 'none', height: '120px'}}
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
                                style={{resize: 'none', height: '80px'}}
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
                                style={{resize: 'none', height: '80px'}}
                            />
                        </div>
                        <div className="uk-margin uk-flex uk-flex-auto uk-flex-between uk-flex-middle">
                            <div className="uk-flex">
                                {uploadingWorkshop &&
                                    <div className="uk-margin-left">
                                        <ReactLoading type={'balls'} color={'#f5e3ae'} height={40} width={40} />
                                    </div>
                                }
                            </div>
                            <button type="submit" className='uk-button uk-button-default'>Crear</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
