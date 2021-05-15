import { useEffect, useState } from 'react';
import { useMutate } from 'restful-react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Uikit from 'uikit/dist/js/uikit.min.js';
import { connectToDatabase } from '../utils/mongodb';
import randomize from "../utils/randomizeHeader"
import Header from '../Components/Header';
import EditGallery from '../Components/EditGallery';
import AddImageModal from '../Components/AddImageModal';
import logic from '../logic/app'
import styles from '../utils/styles/styles.module.css'

export default function Administradora({ portfolio, color, image }) {

    const router = useRouter()
    const [session, loading] = useSession()

    const [description, setDescription] = useState('')
    const [displaySection, setDisplaySection] = useState(undefined)
    const [fileInput, setFileInput] = useState('')
    const [imageList, setImageList] = useState([])
    const [section, setSection] = useState('other')
    const [uploadingImage, setUploadingImage] = useState(false)

    const { mutate: uploadImage } = useMutate({
        verb: 'POST',
        path: 'api/admin/image/upload'
    });

    useEffect(() => {
        handleGetImages(displaySection)
    }, [displaySection])

    useEffect(() => {
        handleGetImages(displaySection)
    }, [portfolio])

    const handleNotification = (status, message) => {
        Uikit.notification({
            message: message,
            pos: "top-center",
            status: status,
            timeout: 3000,
        })
    }

    const handleUploadFinished = () => {
        document.getElementById('fileupload').value = null;
        document.getElementById('description').value = null;
        document.getElementById('sectionSelect').value = 'other';
        setFileInput('');
        setSection('other');
        setDescription('');
        Uikit.modal('#add-image-modal').hide();
    }

    const handleImageAdd = async () => {
        if(fileInput.files[0]){
            try {
                const formData = new FormData();
                formData.append('image', fileInput.files[0]);
                setUploadingImage(true);
                const { message, data: { public_id, secure_url } } = await uploadImage(formData);
                if (message === 'OK') {
                    await logic.addImageData({ publicId: public_id, description, section, url: secure_url });
                } else {
                    handleNotification('danger', `ERROR! No s'ha pogut pujar la imatge`);
                    throw Error('Error en la pujada');
                }
                setUploadingImage(false);
                handleUploadFinished();
                refreshData();
            } catch (error) {
                console.error(error.message);
                handleNotification('danger', `${error.message}`);
            }
        }
    }

    const handleImageDelete = async (publicId) => {
        Uikit.modal('#edit-image-modal').hide();
        const response = await logic.deleteImage(publicId);
        if (response.data && response.data.data && response.data.data.result == "ok"){
            const res = await logic.deleteImageData(publicId);
            if (res.data.status === 'OK') {
                handleNotification('success', "Imatge eliminada correctament!");
            } else {
                handleNotification('danger', `ERROR! ${res.data.message}`);
            }
        } else {
            handleNotification('danger', `ERROR! No sha pogut eliminar`);
        }
        refreshData();
    }

    const handleImageEdit = async (data) => {
        const { id, publicId, description, section } = data
        const res = await logic.editImageData(id, { publicId, description, section })

        if (res.data && res.data.status === 'OK') {
            handleNotification('success', "Imatge editada correctament!");
        } else if (res.data) {
            handleNotification('danger', `ERROR! ${res.data.message}`);
        } else console.error(res);
        Uikit.modal('#edit-image-modal').hide();
        refreshData();
    }

    const handleGetImages = async (_section = undefined) => {
        if (portfolio) {
            const response = await logic.getImages(portfolio, _section);
            setImageList(response);
        }
    }

    const refreshData = () => router.replace(router.asPath);

    return (
        <div className={styles.container}>
            <Head>
                <title>laulópez Arts</title>
            </Head>

            <Header selected={undefined} randColor={color} image={image} />
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
                onSubmit={() => handleImageAdd()}
                uploadingImage={uploadingImage}
            />
        </div >
    )
}

export async function getServerSideProps() {

    const { db } = await connectToDatabase();

    let portfolio = await db
        .collection("portfolios")
        .findOne({})

    const { color, image } = randomize()
    return {
        props: {
            portfolio: portfolio == null ? [] : JSON.parse(JSON.stringify(portfolio.sections)),
            image,
            color
        },
    };
}