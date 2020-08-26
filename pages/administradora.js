import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import request from 'superagent';
import Uikit from 'uikit/dist/js/uikit.min.js'

import Header from '../Components/Header'
import EditGallery from '../Components/EditGallery';
import AddImageModal from '../Components/AddImageModal';

import logic from '../logic/app'

import styles from '../styles/styles.module.css'

export default function Administradora() {

    const [session, loading] = useSession()

    const [description, setDescription] = useState('')
    const [displaySection, setDisplaySection] = useState(undefined)
    const [fileInput, setFileInput] = useState('')
    const [imageList, setImageList] = useState([])
    const [section, setSection] = useState('other')
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingProgress, setUploadingProgress] = useState(0)

    useEffect(() => {
        handleGetImages(displaySection)
    }, [displaySection])

    const handleImageAdd = async (files) => {
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
                                    const res = await logic.addImageData({
                                        id: _id[1],
                                        url: response.body.secure_url,
                                        publicId: response.body.public_id,
                                        section,
                                        description
                                    })
                                    if (res.data.status === 'OK') {
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
                                handleGetImages()
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
                            //for description and section not working... should review
                            document.getElementById('description').value = null;
                            document.getElementById('sectionSelect').value = 'other';
                            setUploadingProgress(0)
                            setFileInput('')
                            setSection('other')
                            setDescription('')
                            Uikit.modal('#add-image-modal').hide();
                            handleGetImages(displaySection)
                        });
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleImageDelete = async (id) => {
        const res = await logic.deleteImageData(id)

        if (res.data.status === 'OK') {
            Uikit.notification({
                message: "Imatge eliminada correctament!",
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
        Uikit.modal('#edit-image-modal').hide();
        handleGetImages()
    }

    const handleImageEdit = async (data) => {
        const { id, description, section } = data

        const res = await logic.editImageData(id, { description, section })

        if (res.data.status === 'OK') {
            Uikit.notification({
                message: "Imatge editada correctament!",
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
        Uikit.modal('#edit-image-modal').hide();
        handleGetImages()
    }

    const handleGetImages = async (_section = undefined) => {
        const response = await logic.getImages(_section)
        setImageList(response)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>laulópez Arts</title>
            </Head>

            <Header selected={undefined} />
            {!session &&
                <main className="uk-padding-large">
                    <div className="uk-padding-large uk-text-center uk-height-1-1">
                        <a className='uk-button uk-button-default uk-button-large' href="/api/auth/signin/google">Sign in</a>
                    </div>
                </main>
            }
            {session &&
                <main className="uk-padding-large">
                    <div className=" uk-padding-large uk-text-center">
                        <button className='uk-button uk-button-default uk-button-large' data-uk-toggle="target: #add-image-modal" type="button">
                            ADD NEW IMAGE
                            </button>
                    </div>
                    <div className='uk-text-center uk-padding-large' >
                            EDIT IMAGES:
                            </div>
                    <div className="uk-animation-scale-up ">
                        <ul className="uk-breadcrumb uk-visible@s">
                            <li><a onClick={() => setDisplaySection(undefined)}>All my works</a></li>
                            <li><a onClick={() => setDisplaySection('screenprinting')}>Screenprinting</a></li>
                            <li><a onClick={() => setDisplaySection('ilustration')}>Ilustration</a></li>
                            <li><a onClick={() => setDisplaySection('science')}>Science</a></li>
                            <li><a onClick={() => setDisplaySection('other')}>Other works</a></li>
                        </ul>
                    </div>
                    <div className="uk-padding uk-text-center">
                        <div>
                            <EditGallery imageList={imageList} onImageDelete={handleImageDelete} onImageEdit={handleImageEdit} />
                        </div>
                        <div className="uk-padding-large" >
                            <a href="/api/auth/signout/google">Sign out</a>
                        </div>
                    </div>
                </main>
            }

            <AddImageModal
                onDescriptionChange={(value) => setDescription(value)}
                onFileInput={(value) => setFileInput(value)}
                onSectionChange={(value) => setSection(value)}
                onSubmit={() => handleImageAdd(fileInput.files)}
                progress={Math.floor(uploadingProgress)}
                uploadingImage={uploadingImage}
            />
        </div >
    )
}
