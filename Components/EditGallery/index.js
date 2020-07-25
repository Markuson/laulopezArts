import { useState } from 'react'
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

    const handleSubmit = () => {
        onImageEdit({ id, description, section })
        setDescription(undefined)
        setId(undefined)
        setPublicId(undefined)
        setSection(undefined)
    }

    const handleImageClick = (description, id, publicId, url) => {
        const _section = publicId.split('/')
        setDescription(description)
        setId(id)
        setPublicId(publicId)
        setSection(_section[0])
        Uikit.modal("#edit-image-modal").show();
    }

return (
    <CloudinaryContext cloudName="marcuson">
        <div
            className="uk-padding-large uk-padding-remove-vertical uk-child-width-1-3@m uk-grid-small uk-grid-match uk-text-center uk-flex-middle"
            data-uk-grid
            data-uk-lightbox="animation: slide"
            uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 1000; repeat: true"
        >
            {
                imageList.map(({ description, id, publicId, url }) => {
                    return <div key={id} onClick={() => handleImageClick(description, id, publicId, url)}>
                        <div className="uk-box-shadow-hover-large uk-animation-fade " tabIndex="0">
                            <Image publicId={publicId} />
                        </div>
                    </div>
                })

            }
        </div>
        <EditModal
            onDelete={(value) => onImageDelete(id)}
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
