import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import request from 'superagent';
import Uikit from 'uikit/dist/js/uikit.min.js';

import { connectToDatabase } from '../utils/mongodb';
import { cloudinaryUpdate } from '../utils/cloudinary';

import Header from '../Components/Header';
import EditGallery from '../Components/EditGallery';
import AddImageModal from '../Components/AddImageModal';

import logic from '../logic/app'

import styles from '../utils/styles/styles.module.css'

export default function Administradora({ cloudinaryUrl, cloudinaryUploadPresset, portfolio }) {

    const router = useRouter()
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

    const handleNotification = (status, message) => {
        Uikit.notification({
            message: message,
            pos: "top-center",
            status: status,
            timeout: 3000,
        })
    }

    const handleUploadingImage = (status = false) => {
        setUploadingImage(status)
    }

    const handleUploadingProgress = (progress = 0) => {
        setUploadingProgress(progress)
    }

    const handleUploadFinished = () => {
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
    }

    const handleImageAdd = async (files) => {
        if (files.length > 0) {
            try {
                cloudinaryUpdate(
                    cloudinaryUrl,
                    cloudinaryUploadPresset,
                    files,
                    description,
                    section,
                    logic.addImageData,
                    handleNotification,
                    handleGetImages,
                    handleUploadingImage,
                    handleUploadingProgress,
                    handleUploadFinished
                )
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    const handleImageDelete = async (id) => {
        const res = await logic.deleteImageData(id)

        //cloudinary.v2.uploader.destroy(public_id, options, callback);

        if (res.data.status === 'OK') {
            handleNotification('success', "Imatge eliminada correctament!")
        } else {
            handleNotification('danger', `ERROR! ${res.data.message}`)
        }
        Uikit.modal('#edit-image-modal').hide();
        refreshData()
        handleGetImages()
    }

    const handleImageEdit = async (data) => {
        const { id, description, section } = data

        const res = await logic.editImageData(id, { publicId: id, description, section })

        if (res.data && res.data.status === 'OK') {
            handleNotification('success', "Imatge editada correctament!")
        } else if (res.data) {
            handleNotification('danger', `ERROR! ${res.data.message}`)
        } else console.error(res)
        Uikit.modal('#edit-image-modal').hide();
        refreshData()
        handleGetImages()
    }

    const handleGetImages = async (_section = undefined) => {
        if (portfolio) {
            const response = await logic.getImages(portfolio, _section)
            setImageList(response)
        }
    }

    const refreshData = () => router.replace(router.asPath);

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

export async function getServerSideProps() {

    const { UPLOADPRESSET: cloudinaryUploadPresset, ADDRESS: cloudinaryUrl } = process.env
    const { db } = await connectToDatabase();

    let portfolio = await db
        .collection("portfolios")
        .findOne({})

    return {
        props: {
            portfolio: portfolio == null ? [] : JSON.parse(JSON.stringify(portfolio.sections)),
            cloudinaryUrl,
            cloudinaryUploadPresset
        },
    };
}
