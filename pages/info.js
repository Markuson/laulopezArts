import Head from 'next/head'
import Header from '../Components/Header'
import randomize from "../utils/randomizeHeader"
import ContactForm from '../Components/ContactForm'
import styles from '../styles/styles.module.css'
import Uikit from 'uikit/dist/js/uikit.min.js';

import logic from '../logic/app'

export default function Info({ color, image }) {

    const handleSendContactForm = async (email, subject, text) => {
        try {
            const response = await logic.sendEmail(email, subject, text)
            if (response.status === 'OK') {
                console.log('DONE', response)
                window.scrollTo(0, 0)
                handleNotification('success', "Gracias por contactar! Recibiras una respuesta tan pronto como pueda.")
                return 'done'
            } else {
                console.log('ERROR: ', response);
                handleNotification('danger', "Error en el envío. Si el error persiste, escríbeme un correo a: laulopezarts@gmail.com.")
                return 'errors'
            }
        } catch (error) {
            var _message = 'Uncaught error'
            if (error.message == 'e-mail not valid') _message = "El correo electrónico no es válido"
            if (error.message == 'email is empty') _message = "Debes introducir un correo electrónico"
            if (error.message == 'subject is empty') _message = "Debes introducir un asunto"
            if (error.message == 'text is empty') _message = "Debes introducir un Mensaje"
            handleNotification('danger', _message)
            return 'errors'
        }

    }

    const handleNotification = (status, message) => {
        Uikit.notification({
            message: message,
            pos: "top-center",
            status: status,
            timeout: 3000,
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>laulopez Arts | Info</title>
            </Head>

            <Header selected='About' randColor={color} image={image} />

            <main className="uk-flex uk-flex-column@m uk-flex-center uk-padding-small uk-padding-remove-bottom">
                <div className="uk-padding uk-flex uk-flex-middle uk-flex-center uk-flex-row" data-uk-grid>
                    <div className="uk-padding uk-padding-remove-vertical uk-animation-fade">
                        <img className="" src="/images/profilePic.jpg" width="440px" alt="Profile Picture" />
                    </div>
                    <div className="uk-container uk-width-2-5@l uk-width-2-6@m uk-width-2-3@s uk-animation-scale-up">
                        <p className={styles.description}>
                        Hola :) Soy Lau, vivo en Barcelona y me dedico a la ilustración y a la serigrafía. Me interesa la biología, el animalismo, el feminismo y la justicia social. 
                        </p>
                        <p className={styles.description}>
                        Además de ilustrar y serigrafiar, realizo murales y tonteo con la animación, el linograbado y el collage.
                        </p>
                        <p className={styles.description}>
                        Puedes encontrar mi trabajo en mi tienda online o hacerme una petición personalizada. Me encontrarás en <a href="https://www.articataller.com" rel="noopener noreferrer" target="_blank">Àrtica</a> dónde también organizo talleres de serigrafía, ilustración y animación para todas las edades.
                        </p>

                    </div>
                </div>
                {/* <div className="uk-padding uk-flex uk-flex-middle uk-flex-center uk-flex-row" data-uk-grid>
                    <div className="uk-flex-last@l uk-padding uk-padding-remove-vertical uk-animation-fade">
                        <img className="" src="/images/artica.jpg" width="440px" alt="Artica Taller" />
                    </div>
                    <div className="uk-container uk-width-2-5@l uk-width-2-6@m uk-width-2-3@s uk-animation-scale-up">
                        <p className={styles.description}>
                            Desde octubre del 2020, gestiono <a href="https://www.articataller.com" rel="noopener noreferrer" target="_blank">Àrtica taller</a>, un espacio creativo de arte y serigrafía en la Barceloneta. Se trata de un taller pensado para el coworking, la formación y la producción de obra gráfica tanto para profesionales como para aficionados en el arte.
                        </p>
                        <p className={styles.description}>
                            Allí me encontrarás a menudo estampando para pequeñas productoras y en ocasiones impartiendo cursos y talleres principalmente de serigrafía.
                        </p>
                    </div>
                </div> */}
                <div className="uk-padding uk-padding-remove-bottom">
                    <p className={styles.text}>CONTÁCTAME :D</p>
                </div>
                <div className="uk-flex uk-flex-center">
                    <div className='uk-padding-small'>
                        <a className={styles.growRotate} target='_blank' href="https://www.instagram.com/laulopezarts/"><img src='icons/instagram.png' width='60px' /></a>
                    </div>
                    <div className='uk-padding-small'>
                        <a className={styles.growRotate} target='_blank' href="https://www.linkedin.com/in/laura-l%C3%B3pez-8a59a351/"><img src='icons/linkedin.png' width='60px' /></a>
                    </div>
                    <div className='uk-padding-small'>
                        <a className={styles.growRotate} target='_blank' href="https://vimeo.com/laulopezarts"><img src='icons/vimeo.png' width='60px' /></a>
                    </div>
                </div>
                <div className="uk-padding uk-padding-remove-bottom">
                    <p className={styles.text}>O ESCRÍBEME UN CORREO:</p>
                </div>
                <ContactForm onContactFrom={handleSendContactForm} />
            </main>
        </div>
    )
}

export async function getServerSideProps() {
    const { color, image } = randomize()
    return {
        props: {
            image,
            color
        },
    };
}
