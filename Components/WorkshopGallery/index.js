import Card from '../Card'
import { CloudinaryContext } from 'cloudinary-react';


export default function WorkshopGallery({
    imageList
}) {

    return (
        <CloudinaryContext cloudName="laulopezarts">
            <div
                className="uk-padding-large uk-padding-remove-bottom uk-child-width-1-2@m uk-grid-large uk-grid-match uk-flex-middle"
                data-uk-grid
                uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 100; repeat: false"
            >
                <div>
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <div className="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" data-uk-slideshow="autoplay: true; autoplay-interval: 3000">
                            <ul className="uk-slideshow-items">
                                <li>
                                    <img src="images/artica.jpg" alt="" data-uk-cover />
                                </li>
                                <li>
                                    <img src="images/profilePic.jpg" alt="" data-uk-cover />
                                </li>
                                <li>
                                    <img src="images/profilePic_OLD.jpg" alt="" data-uk-cover />
                                </li>
                            </ul>
                            <a className="uk-position-center-left uk-position-small" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a>
                            <a className="uk-position-center-right uk-position-small" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>
                        </div>
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-justify">
                                    Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica. Desde la preparación del fotolito manual o digitalmente, dónde conseguir los materiales, la preparación de la pantalla en el laboratorio, la variedad de tintas y cómo aplicarlas, cómo imprimir sobre papel y tela, etc.
                                </p>
                                <p className="uk-text-meta uk-text-justify uk-text- uk-margin-remove-top">
                                    Precio: 195 € las 4 sesiones.<br />
                                    Lugar: Àrtica taller (C/ Sant Elm 45, Barcelona)<br />
                                    Material incluido: primera pantalla, emulsión, recuperador, tintas utilizadas en clase y fungibles.<br />
                                    Aforo limitado. Sesiones personalizadas donde podremos planear los diferentes proyectos de las participantes!
                                </p>
                            </div>
                            <div className="uk-card-footer uk-text-center">
                                <a className="uk-button uk-button-text">+ INFO</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <img src="images/artica.jpg" alt="" />
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-center">
                                    Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica. Desde la preparación del fotolito manual o digitalmente, dónde conseguir los materiales, la preparación de la pantalla en el laboratorio, la variedad de tintas y cómo aplicarlas, cómo imprimir sobre papel y tela, etc.
                                </p>
                                <p className="uk-text-meta uk-text-center uk-text- uk-margin-remove-top">
                                    Precio: 195 € las 4 sesiones.<br />
                                    Lugar: Àrtica taller (C/ Sant Elm 45, Barcelona)<br />
                                    Material incluido: primera pantalla, emulsión, recuperador, tintas utilizadas en clase y fungibles.<br />
                                    Aforo limitado. Sesiones personalizadas donde podremos planear los diferentes proyectos de las participantes!
                                </p>
                            </div>
                            <div className="uk-card-footer uk-text-center">
                                <a className="uk-button uk-button-text">+ INFO</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <img src="images/artica.jpg" alt="" />
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-center">
                                    Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica.
                                </p>
                            </div>
                            <div className="uk-card-footer uk-text-center">
                                <a className="uk-button uk-button-text" data-uk-toggle="target: #modal-full3">+ INFO</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <img src="images/artica.jpg" alt="" />
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-justify">
                                    Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica.
                                </p>
                            </div>
                            <div className="uk-card-footer uk-text-center">
                                <a className="uk-button uk-button-text" data-uk-toggle="target: #modal-full4">+ INFO</a>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="uk-link-reset" data-uk-toggle="target: #modal-full2">
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <img src="images/artica.jpg" alt="" />
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-center">
                                    Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica.
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
                <a className="uk-link-reset" data-uk-toggle="target: #modal-full">
                    <div className="uk-card uk-card-default uk-card-media-top">
                        <img src="images/artica.jpg" alt="" />
                        <div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h3>
                                <p className="uk-text-justify">
                                    Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica.
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div id="modal-full" className="uk-modal-full" data-uk-modal>
                <div className="uk-modal-dialog">
                    <button className="uk-modal-close-full uk-close-large" type="button" data-uk-close></button>
                    <div className="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" data-uk-grid>
                        <div className="uk-background-cover" style={{ backgroundImage: "url('images/artica.jpg')" }} data-uk-height-viewport></div>
                        <div className="uk-padding-large">
                            <h1 className="uk-text-center uk-padding uk-padding-remove-top">INTRODUCCIÓN A LA SERIGRAFÍA</h1>
                            <p className="uk-text-justify">
                                Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica. Desde la preparación del fotolito manual o digitalmente, dónde conseguir los materiales, la preparación de la pantalla en el laboratorio, la variedad de tintas y cómo aplicarlas, cómo imprimir sobre papel y tela, etc.
                            </p>
                            <p className="uk-text-meta uk-text-center uk-padding uk-padding-remove-bottom">
                                Precio: 195 € las 4 sesiones.<br />
                                Lugar: Àrtica taller (C/ Sant Elm 45, Barcelona)<br />
                                Material incluido: primera pantalla, emulsión, recuperador, tintas utilizadas en clase y fungibles.<br />
                                Aforo limitado. Sesiones personalizadas donde podremos planear los diferentes proyectos de las participantes!
                            </p>
                            <div className="uk-card-footer uk-text-center">
                                <a href="#" className="uk-button uk-button-default">contactar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-full2" className="uk-modal-container" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                    <button className="uk-modal-close-default" type="button" data-uk-close></button>
                    <div className="uk-margin">
                        <div className="uk-text-center uk-padding-large uk-padding-remove-vertical">
                            <img src="images/artica.jpg" alt="" />
                        </div>
                        <div className="uk-padding-large">
                            <h1 className="uk-text-center uk-padding uk-padding-remove-top">INTRODUCCIÓN A LA SERIGRAFÍA</h1>
                            <p className="uk-text-justify">
                                Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica. Desde la preparación del fotolito manual o digitalmente, dónde conseguir los materiales, la preparación de la pantalla en el laboratorio, la variedad de tintas y cómo aplicarlas, cómo imprimir sobre papel y tela, etc.
                            </p>
                            <p className="uk-text-meta uk-text-center uk-padding uk-padding-remove-bottom">
                                Precio: 195 € las 4 sesiones.<br />
                                Lugar: Àrtica taller (C/ Sant Elm 45, Barcelona)<br />
                                Material incluido: primera pantalla, emulsión, recuperador, tintas utilizadas en clase y fungibles.<br />
                                Aforo limitado. Sesiones personalizadas donde podremos planear los diferentes proyectos de las participantes!
                            </p>
                            <div className="uk-card-footer uk-text-center">
                                <a href="#" className="uk-button uk-button-default">contactar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-full3" className="uk-modal-container" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                    <button className="uk-modal-close-default" type="button" data-uk-close></button>
                    <div className="uk-margin">
                        <h2 className="uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h2>
                        <div style={{ maxWidth: "640px", margin: "auto" }} className="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" data-uk-slideshow>
                            <ul className="uk-slideshow-items">
                                <li>
                                    <img src="images/artica.jpg" alt="" data-uk-cover />
                                </li>
                                <li>
                                    <img src="images/profilePic.jpg" alt="" data-uk-cover />
                                </li>
                                <li>
                                    <img src="images/profilePic_OLD.jpg" alt="" data-uk-cover />
                                </li>
                            </ul>
                            <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a>
                            <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>
                        </div>
                        <p className="uk-text-justify uk-padding uk-padding-remove-vertical">
                            Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica. Desde la preparación del fotolito manual o digitalmente, dónde conseguir los materiales, la preparación de la pantalla en el laboratorio, la variedad de tintas y cómo aplicarlas, cómo imprimir sobre papel y tela, etc.
                        </p>
                        <div className="uk-padding uk-padding-remove-vertical">
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>Precio: </strong>195 € las 4 sesiones.
                            </p>
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>Lugar: </strong>Àrtica taller (C/ Sant Elm 45, Barcelona)
                            </p>
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>Material incluido: </strong>primera pantalla, emulsión, recuperador, tintas utilizadas en clase y fungibles.<br />
                            </p>
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                Aforo limitado. Sesiones personalizadas donde podremos planear los diferentes proyectos de las participantes!
                            </p>
                        </div>
                        <div className="uk-card-footer uk-text-center">
                            <a href="#" className="uk-button uk-button-default">contactar</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-full4" className="uk-modal-container" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                    <button className="uk-modal-close-default" type="button" data-uk-close></button>
                    <div className="uk-margin">
                        <h2 className="uk-text-center">INTRODUCCIÓN A LA SERIGRAFÍA</h2>
                        <div className="uk-text-center">
                            <iframe
                                width="640"
                                height="360"
                                src="https://player.vimeo.com/video/561026227?title=0&byline=0&portrait=0"
                                frameborder="0"
                                data-uk-video
                                data-uk-responsive
                            />
                        </div>

                        <p className="uk-text-justify uk-padding uk-padding-remove-vertical">
                            Cuatro sesiones de 4 horas donde se explicará y se practicará en profundidad todo el proceso de estampación serigráfica. Desde la preparación del fotolito manual o digitalmente, dónde conseguir los materiales, la preparación de la pantalla en el laboratorio, la variedad de tintas y cómo aplicarlas, cómo imprimir sobre papel y tela, etc.
                        </p>
                        <div className="uk-padding uk-padding-remove-vertical">
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>Precio: </strong>195 € las 4 sesiones.
                            </p>
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>Lugar: </strong>Àrtica taller (C/ Sant Elm 45, Barcelona)
                            </p>
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                <strong>Material incluido: </strong>primera pantalla, emulsión, recuperador, tintas utilizadas en clase y fungibles.<br />
                            </p>
                            <p className="uk-text-meta uk-text-justify uk-padding-remove-vertical uk-margin-remove-vertical">
                                Aforo limitado. Sesiones personalizadas donde podremos planear los diferentes proyectos de las participantes!
                            </p>
                        </div>
                        <div className="uk-card-footer uk-text-center">
                            <a href="#" className="uk-button uk-button-default">contactar</a>
                        </div>
                    </div>
                </div>
            </div>
        </CloudinaryContext >
    )
}
