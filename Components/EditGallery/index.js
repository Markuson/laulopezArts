import { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react';
import { CloudinaryContext } from 'cloudinary-react';
import Uikit from 'uikit/dist/js/uikit.min.js'
import EditModal from '../EditModal';


export default function EditGallery({
    imageList,
    onImageEdit,
    onImageDelete
}) {

    const [description, setDescription] = useState(undefined)
    const [id, setId] = useState(undefined)
    const [publicId, setPublicId] = useState(undefined)
    const [section, setSection] = useState(undefined)

    useEffect(() => {
        setDescription(undefined)
        setId(undefined)
        setPublicId(undefined)
        setSection(undefined)
    }, [])


    const handleSubmit = () => {
        onImageEdit({ id, publicId, description, section })
    }

    const handleImageClick = (description, id, publicId, section, url) => {
        setDescription(description)
        setId(id)
        setPublicId(publicId)
        setSection(section)
        Uikit.modal("#edit-image-modal").show();
    }

    const handleImageDelete = () => {
        onImageDelete(publicId)
    }

    return (
        <CloudinaryContext cloudName="marcuson">
            <div
                className="uk-padding-large uk-padding-remove-vertical uk-child-width-1-3@m uk-grid-small uk-grid-match uk-text-center uk-flex-middle"
                data-uk-grid
                data-uk-lightbox="animation: slide"
                uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 100; repeat: false"
            >
                {!!imageList &&
                    imageList.map(({ description, _id: id, publicId, section, url }) => {
                        return <div key={id} onClick={() => handleImageClick(description, id, publicId, section, url)}>
                            <div className="uk-box-shadow-hover-large uk-animation-fade uk-transition-toggle " tabIndex="0">
                                <div className="uk-inline">
                                    <Image alt={description} publicId={publicId} />
                                    <div className="uk-transition-scale-up">
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <EditModal
                onDelete={() => handleImageDelete() }
                onDescriptionChange={(value) => setDescription(value)}
                onSelectChange={(value) => setSection(value)}
                onSubmit={() => handleSubmit()}
                description={description}
                publicId={publicId}
                section={section}
            />
        </CloudinaryContext>
    )
}
