import ReactLoading from 'react-loading';

export default function AddImageModal({
    onDescriptionChange,
    onFileInput,
    onSectionChange,
    onSubmit,
    uploadingImage,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        (async () => {
            await onSubmit(e);
        })();
        e.target.description.value = '';
        e.target.sectionSelect.value = 'other'
    }
    return (
        <div id="add-image-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <legend className="uk-legend" path="title">Añadir Imágenes:</legend>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" >Seccción:</label>
                            <select
                                className="uk-select"
                                onChange={(e) => onSectionChange(e.target.value)}
                                id='sectionSelect'
                                defaultValue='other'
                            >
                                <option value="screenprinting">Serigrafía</option>
                                <option value="ilustration">Ilustración</option>
                                <option value="science">Ciencia</option>
                                <option value="other">Otras técnicas</option>
                            </select>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" >Descripción:</label>
                            <input
                                className="uk-input"
                                type="text"
                                id="description"
                                onChange={e => onDescriptionChange(e.target.value)}
                            />
                        </div>
                        <div className="uk-margin uk-flex uk-flex-center">
                            <input
                                type="file"
                                id="fileupload"
                                accept="image/*"
                                ref={_fileInput =>
                                    onFileInput(_fileInput)
                                }
                            />
                        </div>
                        <div className="uk-margin uk-flex uk-flex-auto uk-flex-between uk-flex-middle">
                            <div className="uk-flex">
                                {uploadingImage &&
                                    <div className="uk-margin-left">
                                        <ReactLoading type={'balls'} color={'#f5e3ae'} height={40} width={40} />
                                    </div>
                                }
                            </div>
                            <button className='uk-button uk-button-default'>Puja</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
