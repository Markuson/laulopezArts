import {useEffect, useState} from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import Uikit from 'uikit/dist/js/uikit.min.js'
import WorkshopEditModal from '../WorkshopEditModal';
import WorkshopCard from '../WorkshopCard';


export default function WorkshopEditGallery({
    color,
    onDelete,
    onEdit,
    workshops,
}) {
    useEffect(() => {
        Uikit.util.on('#edit-workshop-modal', 'hide', function () {
            Uikit.slideshow("#slideshow").show(0);
        });
        Uikit.util.on('#edit-workshop-modal', 'show', function () {
            Uikit.slideshow("#slideshow").show(0);
        });
    }, [])

    const [workshopDescription, setWorkshopDescription] = useState('')
    const [workshopId, setWorkshopId] = useState('')
    const [workshopIncluded, setWorkshopIncluded] = useState('')
    const [workshopImages, setWorkshopImages] = useState([])
    const [workshopOther, setWorkshopOther] = useState('')
    const [workshopPlace, setWorkshopPlace] = useState('')
    const [workshopPrice, setWorkshopPrice] = useState('')
    const [workshopSubtitle, setWorkshopSubtitle] = useState('')
    const [workshopTitle, setWorkshopTitle] = useState('')
    const [workshopVideo, setWorkshopVideo] = useState('')
    const [workshopVideoLink, setWorkshopVideoLink] = useState('')

    const handleWorkshopClick = (workshopData) => {
        const {description, _id: id, images, included, other, place, price, subtitle, title, video} = workshopData
        setWorkshopDescription(description)
        setWorkshopId(id)
        setWorkshopImages(images)
        setWorkshopIncluded(included)
        setWorkshopOther(other)
        setWorkshopPlace(place)
        setWorkshopPrice(price)
        setWorkshopSubtitle(subtitle)
        setWorkshopTitle(title)
        setWorkshopVideoLink(video)
        let arr = video.split('/')
        setWorkshopVideo(arr[arr.length - 1])
        Uikit.modal("#edit-workshop-modal").show();
    }

    const handleWorkshopEdit = () => {
        const data = {
            description: workshopDescription,
            id: workshopId,
            images: workshopImages,
            included: workshopIncluded,
            other: workshopOther,
            place: workshopPlace,
            price: workshopPrice,
            subtitle: workshopSubtitle,
            title: workshopTitle,
            video: workshopVideoLink
        }
        onEdit(data)
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
                            buttonTitle={"EDITAR"}
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
            <WorkshopEditModal
                onDelete={() => onDelete(workshopId, workshopImages)}
                onDescriptionChange={(value) => setWorkshopDescription(value)}
                onIncludedChange={(value) => setWorkshopIncluded(value)}
                onOtherChange={(value) => setWorkshopOther(value)}
                onPlaceChange={(value) => setWorkshopPlace(value)}
                onPriceChange={(value) => setWorkshopPrice(value)}
                onSubtitleChange={(value) => setWorkshopSubtitle(value)}
                onTitleChange={(value) => setWorkshopTitle(value)}
                onVideoChange={(value) => setWorkshopVideoLink(value)}
                onSubmit={() => handleWorkshopEdit()}
                description={workshopDescription}
                images={workshopImages}
                inculded={workshopIncluded}
                other={workshopOther}
                place={workshopPlace}
                price={workshopPrice}
                subtitle={workshopSubtitle}
                title={workshopTitle}
                video={workshopVideo}
                videoLink={workshopVideoLink}
            />
        </CloudinaryContext >
    )
}
