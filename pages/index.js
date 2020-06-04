import Head from 'next/head'

import Header from '../Components/Header'
import Portfolio from '../Components/Portfolio'

import styles from '../styles/styles.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulópez Arts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected="Home" />
      <main className="uk-padding-large">
        <div className="uk-padding uk-padding-remove-top uk-padding-remove-horizontal">
          <ul className="uk-breadcrumb">
            <li><a href="">Serigrafia</a></li>
            <li><a href="">Gravat</a></li>
            <li><a href="">Tècniques Seques</a></li>
            <li><a href="">Pintura</a></li>
            <li><a href="">Digital</a></li>
            <li><a href="">Animació</a></li>
            <li><a href="">Ciència</a></li>
            <li><a href="">Altres</a></li>
          </ul>
        </div>

        <Portfolio />
      </main>

      <footer>
        <p className={styles.description}>
          footer
        </p>
      </footer>
    </div>
  )
}
