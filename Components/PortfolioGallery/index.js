import Card from '../Card'
import { CloudinaryContext } from 'cloudinary-react';


export default function PortfolioGallery({
    imageList
}) {

    return (
        <CloudinaryContext cloudName="marcuson">
            <div
                className="uk-padding-large uk-padding-remove-vertical uk-child-width-1-3@m uk-grid-small uk-grid-match uk-text-center uk-flex-middle"
                data-uk-grid
                data-uk-lightbox="animation: slide"
                uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 100; repeat: false"
            >
                {
                    imageList.map(({ description, id, publicId, url }) => {

                        return <div key={id} className="card">
                            <Card description={description} id={id} publicId={publicId} url={url} />
                        </div>
                    })

                }
            </div>
        </CloudinaryContext>
    )
}
