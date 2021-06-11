import { useState } from 'react'
import {Image, Transformation} from 'cloudinary-react';

export default function EditModal({
    onDelete,
    onDescriptionChange,
    onSelectChange,
    onSubmit,
    description,
    publicId,
    section
}) {
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e); 
        e.target.description.value='';
        e.target.sectionSelect.value=''
    }

    return (
        <div id="edit-image-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <button className="uk-modal-close-default" type="button" data-uk-close></button>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin uk-text-center">
                            <legend className="uk-legend" path="title">Editar Imagen:</legend>
                        </div>
                        <div className="uk-text-center">
                            <Image alt={description} publicId={publicId}>
                                <Transformation quality="auto" height="350" crop="fill" />
                            </Image>

                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" >Seccción:</label>
                            <select
                                className="uk-select"
                                onChange={(e) => onSelectChange(e.target.value)}
                                id='sectionSelect'
                                value={section}
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
                                value={description}
                                onChange={e => onDescriptionChange(e.target.value)}
                            />
                        </div>
                        <div className="uk-margin uk-flex uk-flex-auto uk-flex-between uk-flex-middle">
                            <button type="button" onClick={() => setConfirmDelete(true)} className='uk-button uk-button-danger'>Esborra</button>
                            <button type="submit" className='uk-button uk-button-default'>Guarda</button>
                        </div>
                        {confirmDelete &&
                            <div className="uk-margin-small uk-flex uk-flex-column">
                                <div className="uk-text-center" >
                                    <span className="uk-text-center">Seguro que quieres borrar la imagen? </span>
                                </div>
                                <div className="uk-margin uk-flex uk-flex-auto uk-flex-around uk-flex-middle">
                                    <button type="button" onClick={() => setConfirmDelete(false)} className='uk-button uk-button-default'>Cancela</button>
                                    <button type="button" onClick={() =>{ onDelete(); setConfirmDelete(false)}} className='uk-button uk-button-danger'>Confirma</button>
                                </div>
                            </div>
                        }
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
