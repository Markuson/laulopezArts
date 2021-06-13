export default function WorkshopModal({onGoToContact}) {

    const handleGoToContact = (e) => {
        e.preventDefault();
        onGoToContact(e); 
    }

    return (
        <div id="workshop-modal" className="uk-modal-container" data-uk-modal>
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
                                <li>
                                    <iframe
                                        src="https://player.vimeo.com/video/561026227?autoplay=1&loop=1&title=0&byline=0&portrait=0"
                                        width="640"
                                        height="360"
                                        frameborder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowfullscreen
                                        data-uk-video
                                        data-uk-responsive
                                    />
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
                            <a className="uk-button uk-button-default" onClick={handleGoToContact}>contactar</a>
                        </div>
                    </div>
                </div>
            </div>
    )
}
