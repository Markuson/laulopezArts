import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { CloudinaryContext } from 'cloudinary-react';
import Uikit from 'uikit/dist/js/uikit.min.js'
import WorkshopModal from '../WorkshopModal';
import WorkshopCard from '../WorkshopCard';
import styles from '../../styles/styles.module.css';

export default function WorkshopGallery({
    workshops,
    color
}) {

    useEffect(() => {
        Uikit.util.on('#workshop-modal', 'hide', function () {
            Uikit.slideshow("#slideshow").show(0);
        });
        Uikit.util.on('#workshop-modal', 'show', function () {
            Uikit.slideshow("#slideshow").show(0);
        });
    }, [])

    const router = useRouter()
    const [workshopDescription, setWorkshopDescription] = useState('')
    const [workshopImages, setWorkshopImages] = useState([])
    const [workshopIncluded, setWorkshopIncluded] = useState('')
    const [workshopOther, setWorkshopOther] = useState('')
    const [workshopPlace, setWorkshopPlace] = useState('')
    const [workshopPrice, setWorkshopPrice] = useState('')
    const [workshopTitle, setWorkshopTitle] = useState('')
    const [workshopVideo, setWorkshopVideo] = useState('')

    const handleGoToContact = (e) => {
        Uikit.modal(`#workshop-modal`).hide();
        router.push('/info#contact', undefined, {scroll:false})
    }


    const handleWorkshopClick = (workshopData) => {
        const {description, images, included, other, place, price, title, video} = workshopData
        setWorkshopDescription(description)
        setWorkshopImages(images)
        setWorkshopIncluded(included)
        setWorkshopOther(other)
        setWorkshopPlace(place)
        setWorkshopPrice(price)
        setWorkshopTitle(title)
        let arr = video.split('/')
        setWorkshopVideo(arr[arr.length - 1])
        Uikit.modal("#workshop-modal").show();
    }

    return (
        <CloudinaryContext cloudName="laulopezarts">
            <div
                className="uk-padding-large uk-padding-remove-bottom uk-child-width-1-2@m uk-grid-large uk-grid-match uk-flex-middle"
                data-uk-grid
                uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 100; repeat: false"
            >
                    {!!workshops &&
                        workshops.map(workshop => {
                            return <WorkshopCard
                            key={workshop._id}
                            color={color}
                            id={workshop._id}
                            imageId={workshop.images[0].publicId}
                            subtitle={workshop.subtitle}
                            title={workshop.title}
                            onClick={() => handleWorkshopClick(workshop)}
                            />
                        })

                    }
                <div>
                </div>
            </div>
            {!workshops.length && <div className="uk-padding-large">
                <p className={styles.text}>
                        Lo siento, ahora mismo no tengo talleres en marcha...
                    </p>
                    <p className={styles.text}>
                        Pero permanece atenta a esta página si quieres apuntarte a uno. También puedes <a className="uk-link" onClick={() => handleGoToContact()}> contactar conmigo</a> para más información.
                    </p>
                </div>
                }
            <WorkshopModal
                description={workshopDescription}
                included={workshopIncluded}
                images={workshopImages}
                onGoToContact={() => handleGoToContact()}
                other={workshopOther}
                place={workshopPlace}
                price={workshopPrice}
                title={workshopTitle}
                video={workshopVideo}
            />
        </CloudinaryContext >
    )
}
