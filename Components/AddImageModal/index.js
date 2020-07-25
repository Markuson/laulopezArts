import { useEffect } from 'react'

export default function AddImageModal({
    onDescriptionChange,
    onFileInput,
    onSectionChange,
    onSubmit,
    progress,
    uploadingImage,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e); 
        e.target.description.value='';
        e.target.sectionSelect.value='other'
    }
    return (
        <div id="add-image-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <legend className="uk-legend" path="title">Afegir Imatges:</legend>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" >Seccció:</label>
                            <select
                                className="uk-select"
                                onChange={(e) => onSectionChange(e.target.value)}
                                id='sectionSelect'
                                defaultValue='other'
                            >
                                <option value="screenprinting">Screenprinting</option>
                                <option value="ilustration">Ilustration</option>
                                <option value="science">Science</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" >Descripció:</label>
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
                            <div>
                                {uploadingImage &&
                                    <div>
                                        <span className="uk-margin-left uk-text-middle">Pujant...{progress}% </span>
                                        <progress value={progress} max='100' >{progress}%</progress>
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
