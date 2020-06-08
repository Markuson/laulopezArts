import Head from 'next/head'

import Header from '../Components/Header'

import styles from '../styles/styles.module.css'

export default function Info() {
    return (
        <div className={styles.container}>
            <Head>
                <title>laulopez Arts | About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header selected='About' />

            <main className="uk-flex uk-flex-column uk-flex-center uk-padding-large">
                <div className="uk-flex uk-flex-center uk-flex-row uk-flex-stretch uk-flex-middle uk-flex-top">
                    <div className=" uk-padding uk-padding-remove-horizontal uk-flex-right uk-animation-fade">
                        <img src="/images/profile picture.jpg" width="440px" alt="Profile Picture" />
                    </div>
                    <div className="uk-flex-left  uk-flex-stretch uk-padding-small uk-width-1-3 uk-animation-scale-up">
                        <p className={styles.description}>
                            I am Laura.  I am a biologist, illustrator and screenprinting artist.
                        </p>
                        <p className={styles.description}>
                            I currently live and work in Barcelona. You can find me in Àrtica Studio.
                        </p>
                        <p className={styles.description}>
                            For work enquiries or collaboration please contact me on <a><strong>info@laulopezarts.com</strong></a>
                        </p>
                        <p className={styles.description}>
                            I enjoy using art to bring biodiversity closer to people.
                        </p>
                    </div>
                </div>
                <div className="uk-padding uk-padding-remove-bottom">
                    <p className={styles.text}>Find me in:</p>
                </div>
                <div className="uk-flex uk-flex-center">
                    <div className='uk-padding-small'>
                        <a className={styles.growRotate} href="https://www.instagram.com/lau_llc/"><img src='icons/instagram.png' width='60px' /></a>
                    </div>
                    <div className='uk-padding-small'>
                        <a className={styles.growRotate} href="https://www.facebook.com/entre.nusos" ><img src='icons/behance.png' width='60px' /></a>
                    </div>
                    <div className='uk-padding-small'>
                        <a className={styles.growRotate} href=""><img src='icons/linkedin.png' width='60px' /></a>
                    </div>
                </div>
            </main>
        </div>
    )
}
