import Head from 'next/head'
import Header from '../Components/Header'
import randomize from "../utils/randomizeHeader"
import styles from '../styles/styles.module.css'

export default function Info({color, image}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>laulopez Arts | Info</title>
            </Head>

            <Header selected='About'  randColor={color} image={image} />

            <main className="uk-flex uk-flex-column@m uk-flex-center uk-padding-small uk-padding-remove-bottom">
                <div className="uk-padding uk-flex uk-flex-middle uk-flex-center uk-flex-row" data-uk-grid>
                    <div className="uk-padding uk-padding-remove-vertical uk-animation-fade">
                        <img className="" src="/images/profilePic.jpg" width="440px" alt="Profile Picture" />
                    </div>
                    <div className="uk-container uk-width-2-5@l uk-width-2-6@m uk-width-2-3@s uk-animation-scale-up">
                        <p className={styles.description}>
                            Soy ilustradora y mis intereses giran en torno al animalismo, el feminismo y la justicia social. Creo en el Arte como herramienta transformadora y he encontrado en la serigrafía el medio idóneo para transmitir estas ideas y acercar el arte a la sociedad.
                        </p>
                        <p className={styles.description}>
                            Al haberme formado como bióloga, una parte importante de mi trabajo sigue vinculada a la divulgación científica, pero enfocándola desde la producción de materiales con interés artístico.
                        </p>
                    </div>
                </div>
                <div className="uk-padding uk-flex uk-flex-middle uk-flex-center uk-flex-row" data-uk-grid>
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
                </div>
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
                </div>
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
