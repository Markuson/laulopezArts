import {Image} from 'cloudinary-react';
import { CloudinaryContext } from 'cloudinary-react';
import EditModal from '../EditModal';


export default function EditGallery({
    imageList
}) {

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
                        return <div key={id} onClick={()=> console.log(`id:${id}`)}>
                            <div className="uk-box-shadow-hover-large uk-animation-fade " tabIndex="0" data-uk-toggle="target: #edit-image-modal">
                                <Image publicId={publicId} />
                            </div>
                        </div>
                    })

                }
            </div>
            <EditModal 
                onDelete={(value) => console.log(`delete: ${value}`)} 
                onDescriptionChange={(value) => console.log(`description:${value}`)}
                onSelectChange={(value) => console.log(`select: ${value}`)} 
                onSubmit={(value) => console.log(`DESAR:${value}`)}
            />
        </CloudinaryContext>
    )
}
