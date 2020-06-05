import Head from 'next/head'

import Header from '../Components/Header'

import styles from '../styles/styles.module.css'

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>laulopez Arts | Sobre mi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header selected='About' />

            <main className="uk-padding-large">
                <div className="uk-animation-fade">
                    <img src="/images/profile picture.jpg" alst="Profile Picture" />
                </div>
                <div className="uk-animation-scale-up">
                    <h3 className=" description uk-padding-large uk-padding-remove-vertical uk-text-left uk-width-1-1">
                        Title:
                    </h3>
                    <p className=" description uk-padding-large uk-padding-remove-vertical uk-text-justify">
                        Lorem fistrum me cago en tus muelas apetecan diodeno. Mamaar fistro mamaar jarl a peich apetecan ese que llega papaar papaar pupita benemeritaar. Sexuarl ese hombree diodeno benemeritaar pecador a gramenawer mamaar mamaar llevame al sircoo jarl. No puedor está la cosa muy malar está la cosa muy malar llevame al sircoo. Benemeritaar la caidita a wan está la cosa muy malar torpedo se calle ustée ahorarr ese que llega benemeritaar. Fistro quietooor sexuarl de la pradera sexuarl a wan la caidita me cago en tus muelas. Me cago en tus muelas sexuarl tiene musho peligro a gramenawer no te digo trigo por no llamarte Rodrigor va usté muy cargadoo jarl por la gloria de mi madre hasta luego Lucas ese que llega. Por la gloria de mi madre diodeno papaar papaar caballo blanco caballo negroorl ese hombree ese que llega ahorarr te va a hasé pupitaa no puedor quietooor.
                    </p>
                    <p className="uk-padding-large uk-text-justify uk-padding-remove-vertical">
                        La caidita no te digo trigo por no llamarte Rodrigor de la pradera pupita la caidita me cago en tus muelas a peich te va a hasé pupitaa. Ese hombree caballo blanco caballo negroorl mamaar no puedor hasta luego Lucas. Se calle ustée jarl no puedor papaar papaar caballo blanco caballo negroorl llevame al sircoo ese que llega benemeritaar la caidita va usté muy cargadoo pecador. Diodenoo a wan benemeritaar ese que llega ese hombree está la cosa muy malar amatomaa pupita hasta luego Lucas quietooor. Condemor sexuarl a peich te voy a borrar el cerito. Pecador condemor por la gloria de mi madre qué dise usteer al ataquerl quietooor ese que llega pecador pecador.

                    </p>
                </div>
            </main>
        </div>
    )
}
