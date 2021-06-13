import { useRouter } from 'next/router';
import { CloudinaryContext } from 'cloudinary-react';
import Uikit from 'uikit/dist/js/uikit.min.js'
import WorkshopModal from '../WorkshopModal';


export default function WorkshopGallery({
    color
}) {
    const router = useRouter()

    const handleGoToContact = (e) => {
        Uikit.modal("#workshop-modal").hide();
        router.push('/info#contact', undefined, {scroll:false})
    }

    return (
        <CloudinaryContext cloudName="laulopezarts">
            <div
                className="uk-padding-large uk-padding-remove-bottom uk-child-width-1-2@m uk-grid-large uk-grid-match uk-flex-middle"
                data-uk-grid
                uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 100; repeat: false"
            >
                <div>
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <img src="images/artica.jpg" alt="" />
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-center">
                                    Aprende y practica en profundidad todo el proceso de estampación serigráfica.
                                </p>
                            </div>
                            <div style={{ backgroundColor: color }} className="uk-card-footer uk-text-center">
                                <a className="uk-button uk-button-text" data-uk-toggle="target: #workshop-modal">
                                    <strong>+ INFO</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WorkshopModal onGoToContact={handleGoToContact}/>
        </CloudinaryContext >
    )
}
