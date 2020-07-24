import { useEffect, useState } from 'react'
import Head from 'next/head'
import request from 'superagent';
import Uikit from 'uikit/dist/js/uikit.min.js'

import Header from '../Components/Header'

import logic from '../logic/app'

import styles from '../styles/styles.module.css'

export default function Administradora() {
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingProgress, setUploadingProgress] = useState(0)
    const [section, setSection] = useState('other')
    const [fileInput, setFileInput] = useState('')
    const [description, setDescription] = useState('')

    const onImageAdd = (files) => {
        if (files.length > 0) {
            try {
                const uploadPreset = process.env.UPLOADPRESET
                const url = process.env.ADDRESS
                setUploadingImage(true)
                for (let file of files) {
                    request.post(url)
                        .field('upload_preset', uploadPreset)
                        .field('file', file)
                        .field('multiple', true)
                        .field('tags', section ? `${section}` : 'untagged')
                        .field('context', section ? `photo=${section}` : '')
                        .field('folder', section ? `${section}` : '')
                        .on('progress', (_progress) =>
                            setUploadingProgress(Math.floor(_progress.percent))
                        )
                        .end((error, response) => {
                            if (response.statusCode == 200) {
                                const _id = response.body.public_id.split('/');
                                (async () => {
                                    const res = await logic.addImagedata({
                                        id: _id[1],
                                        url: response.body.secure_url,
                                        publicId: response.body.public_id,
                                        section,
                                        description
                                    })
                                    if (res.data.status ==='OK') {
                                        Uikit.notification({
                                            message: "Imatge pujada correctament!",
                                            pos: "top-center",
                                            status: 'success',
                                            timeout: 3000,
                                        })
                                    } else {
                                        Uikit.notification({
                                            message: `ERROR! ${res.data.message}`,
                                            pos: "top-center",
                                            status: 'danger',
                                            timeout: 3000,
                                        })
                                    }
                                })();
                                setUploadingImage(false)
                            } else {
                                Uikit.notification({
                                    message: "Error en la pujada!   ",
                                    pos: "top-center",
                                    status: 'danger',
                                    timeout: 3000,
                                })
                            }
                            document.getElementById('fileupload').value = null;
                            document.getElementById('description').value = null;
                            document.getElementById('sectionSelect').value = 'other';
                            setUploadingProgress(0)
                            setFileInput('')
                            setSection('other')
                            setDescription('')
                            Uikit.modal('#add-image-modal').hide();
                        });
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>laulópez Arts</title>
            </Head>

            <Header selected={undefined} />
            <main className="uk-padding-large">
                <div className="uk-padding-large uk-text-center">
                    <button className='uk-button uk-button-default uk-button-large' data-uk-toggle="target: #add-image-modal" type="button">
                        ADD NEW IMAGE
                    </button>
                </div>
                <div className="uk-padding uk-text-center">
                    <div className='uk-text-center uk-padding-small' >
                        EDIT IMAGES:
                    </div>
                    <div>
                    </div>
                </div>
            </main>
            <div id="add-image-modal" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                    <button className="uk-modal-close-default" type="button" data-uk-close></button>
                    <form onSubmit={(e) => { e.preventDefault(); onImageAdd(fileInput.files) }}>
                        <fieldset className="uk-fieldset">
                            <div className="uk-margin">
                                <legend className="uk-legend" path="title">Afegir Imatges:</legend>
                            </div>
                            <div className="uk-margin">
                                <label className="uk-form-label" >Seccció:</label>
                                <select
                                    className="uk-select"
                                    onChange={(e) => setSection(e.target.value)}
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
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin uk-flex uk-flex-center">
                                <input
                                    type="file"
                                    id="fileupload"
                                    accept="image/*"
                                    ref={_fileInput =>
                                        setFileInput(_fileInput)
                                    }
                                />
                            </div>
                            <div className="uk-margin uk-flex uk-flex-auto uk-flex-between uk-flex-middle">
                                <div>
                                    {uploadingImage &&
                                        <span className="uk-margin-left uk-text-middle">Pujant... Progrés: {Math.floor(uploadingProgress)}% </span>
                                    }
                                </div>
                                <button className='uk-button uk-button-default'>Puja</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

        </div >
    )
}
