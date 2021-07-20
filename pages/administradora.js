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
import WorkshopEditGallery from '../Components/WorkshopEditGallery';
import AddImageModal from '../Components/AddImageModal';
import WorkshopCreateModal from '../Components/WorkshopCreateModal';
import logic from '../logic/app'
import styles from '../utils/styles/styles.module.css'

export default function Administradora({ portfolio, color, image, workshops }) {

    const router = useRouter()
    const [session, loading] = useSession()

    const [description, setDescription] = useState('')
    const [displaySection, setDisplaySection] = useState(undefined)
    const [fileInput, setFileInput] = useState('')
    const [imageList, setImageList] = useState([])
    const [section, setSection] = useState('other')
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingWorkshop, setUploadingWorkshop] = useState(false)
    const [workshopDescription, setWorkshopDescription] = useState('')
    const [workshopFileInput, setWorkshopFileInput] = useState('')
    const [workshopIncluded, setWorkshopIncluded] = useState('')
    const [workshopOther, setWorkshopOther] = useState('')
    const [workshopPlace, setWorkshopPlace] = useState('')
    const [workshopPrice, setWorkshopPrice] = useState('')
    const [workshopSubtitle, setWorkshopSubtitle] = useState('')
    const [workshopTitle, setWorkshopTitle] = useState('')
    const [workshopVideo, setWorkshopVideo] = useState('')

    const { mutate: uploadImage } = useMutate({
        verb: 'POST',
        path: 'api/admin/image/upload'
    });
    const { mutate: uploadWorkshop} = useMutate({
        verb: 'POST',
        path: 'api/admin/workshop/upload',
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

    const handleWorkshopUploadFinished = () => {
        document.getElementById('fileupload').value = null;
        document.getElementById('workshopDescription').value = null;
        document.getElementById('workshopIncluded').value = null;
        document.getElementById('workshopOther').value = null;
        document.getElementById('workshopPlace').value = null;
        document.getElementById('workshopPrice').value = null;
        document.getElementById('workshopSubtitle').value = null;
        document.getElementById('workshopTitle').value = null;
        document.getElementById('workshopVideo').value = null;
        setWorkshopDescription('');
        setWorkshopFileInput('');
        setWorkshopIncluded('');
        setWorkshopOther('');
        setWorkshopPlace('');
        setWorkshopPrice('');
        setWorkshopSubtitle('');
        setWorkshopTitle('');
        setWorkshopVideo('');
        Uikit.modal('#create-workshop-modal').hide();
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
                    handleNotification('danger', `ERROR! No se ha podido subir la imagen`);
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
                handleNotification('success', "Imagen eliminada correctamente!");
            } else {
                handleNotification('danger', `ERROR! ${res.data.message}`);
            }
        } else {
            handleNotification('danger', `ERROR! No se ha podido eliminar`);
        }
        refreshData();
    }

    const handleImageEdit = async (data) => {
        Uikit.modal('#edit-image-modal').hide();
        const { id, publicId, description, section } = data
        const res = await logic.editImageData(id, { publicId, description, section })

        if (res.data && res.data.status === 'OK') {
            handleNotification('success', "Imagen editada correctamente!");
        } else if (res.data) {
            handleNotification('danger', `ERROR! ${res.data.message}`);
        } else console.error(res);
        refreshData();
    }

    const handleWorkshopAdd = async () => {
        let workshopData = {
            title: workshopTitle,
            subtitle: workshopSubtitle,
            description: workshopDescription,
            video: workshopVideo,
            included: workshopIncluded,
            other: workshopOther,
            place: workshopPlace,
            price: workshopPrice,
            images: []
        }
        if(workshopFileInput.files){
            try {
                setUploadingWorkshop(true);
                let requests = []
                let responses = []
                let wrongResponse = false
                Object.keys(workshopFileInput.files).forEach(async (key) => {
                    const formData = new FormData();
                    formData.append('image', workshopFileInput.files[key]);
                    requests.push(formData)
                })
                for (let request of requests) {
                    const { message, data } = await uploadWorkshop(request);
                    message === 'OK' ?
                        responses.push(data)
                        :
                        wrongResponse = true
                }
                if (!wrongResponse){
                    responses.forEach(response => {
                        workshopData.images.push({
                            publicId: response.public_id,
                            url: response.secure_url 
                        })
                    })
                    const res = await logic.addWorkshop(workshopData);
                    console.log('MARC RESPONSE: ', res)
                    handleNotification('success', "Workshop creado correctamente!");
                }else{
                    handleNotification('danger', `ERROR! No se han podido subir todas las imagenes`);
                }
                setUploadingWorkshop(false);
                handleWorkshopUploadFinished();
                refreshData();
            } catch (error) {
                console.error(error.message);
                handleNotification('danger', `${error.message}`);
            }
        }
    }

    const handleWorkshopDelete = async (id, images) => {
        Uikit.modal('#edit-workshop-modal').hide();
        let responses = []
        let wrongResponse = false
        for (let image of images) {
            const response = await logic.deleteImage(image.publicId);
            (response.data && response.data.data && response.data.data.result == "ok") ?
                responses.push(responses.data)
                :
                wrongResponse = true
        }
        if (!wrongResponse) {
            const res = await logic.deleteWorkshop(id);
            console.log(res)
            if (res.data.status === 'OK') {
                handleNotification('success', "Workshop eliminado correctamente!");
            } else {
                handleNotification('danger', `ERROR! ${res.data.message}`);
            }
        } else {
            handleNotification('danger', `ERROR! No se han podido eliminar todas las imagenes del workshop, prueba otra vez`);
        }
        refreshData();
    }

    const handleWorkshopEdit = async (data) => {
        Uikit.modal('#edit-workshop-modal').hide();
        const res = await logic.editWorkshop(data)
        if (res.data && res.data.status === 'OK') {
            handleNotification('success', "Workshop editado correctamente!");
        } else if (res.data) {
            handleNotification('danger', `ERROR! ${res.data.message}`);
        } else console.error(res);
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
                            AÑADIR IMAGEN
                            </button>
                    </div>
                    <div className=" uk-padding-large uk-text-center">
                        <button className='uk-button uk-button-default uk-button-large' data-uk-toggle="target: #create-workshop-modal" type="button">
                            AÑADIR WORKSHOP
                            </button>
                    </div>
                    <div className='uk-text-center uk-padding-large' >
                        EDITAR IMÁGENES:
                            </div>
                    <div className="uk-animation-scale-up ">
                        <ul className="uk-breadcrumb uk-visible@s">
                            <li><a onClick={() => setDisplaySection(undefined)}>Todo</a></li>
                            <li><a onClick={() => setDisplaySection('screenprinting')}>Serigrafía</a></li>
                            <li><a onClick={() => setDisplaySection('ilustration')}>Ilustración</a></li>
                            <li><a onClick={() => setDisplaySection('science')}>Ciencia</a></li>
                            <li><a onClick={() => setDisplaySection('other')}>Otras técnicas</a></li>
                        </ul>
                    </div>
                        <div>
                            <EditGallery imageList={imageList} onImageDelete={handleImageDelete} onImageEdit={handleImageEdit} />
                        </div>
                        <div className='uk-text-center uk-padding-large' >
                        EDITAR TALLERES:
                        </div>
                        <div>
                            <WorkshopEditGallery workshops={workshops} onDelete={handleWorkshopDelete} onEdit={handleWorkshopEdit} color={color} />
                        </div>
                    <div className="uk-padding uk-text-center">
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
            <WorkshopCreateModal
            onDescriptionChange={(value) => setWorkshopDescription(value)}
            onFileInput={(value) => setWorkshopFileInput(value)}
            onIncludedChange={(value) => setWorkshopIncluded(value)}
            onOtherChange={(value) =>setWorkshopOther(value)}
            onPlaceChange={(value) =>setWorkshopPlace(value)}
            onPriceChange={(value) =>setWorkshopPrice(value)}
            onSubtitleChange={(value) =>setWorkshopSubtitle(value)}
            onTitleChange={(value) =>setWorkshopTitle(value)}
            onVideoChange={(value) => setWorkshopVideo(value)}
            onSubmit={() => handleWorkshopAdd()}
            description={workshopDescription}
            images={(images) => console.log(images)}
            inculded={workshopIncluded}
            other={workshopOther}
            place={workshopPlace}
            price={workshopPrice}
            subtitle={workshopSubtitle}
            title={workshopTitle}
            uploadingWorkshop={uploadingWorkshop}
            video={workshopVideo}
            />
        </div >
    )
}

export async function getServerSideProps() {

    const { db } = await connectToDatabase();

    let portfolio = await db
        .collection("portfolios")
        .findOne({})

    const workshop = await db
        .collection("workshops")
        .find({})
        .toArray()
    const { color, image } = randomize()
    return {
        props: {
            workshops: workshop == null ? [] : JSON.parse(JSON.stringify(workshop)),
            portfolio: portfolio == null ? [] : JSON.parse(JSON.stringify(portfolio.sections)),
            image,
            color
        },
    };
}