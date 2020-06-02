import Head from 'next/head'

import Header from '../Components/Header'

import styles from '../styles/styles.module.css'

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulopez Arts | Contacte</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected='Contact' />

      <main>
        <h1 className={styles.title}>
          Contacte
        </h1>
      </main>

      <footer>
        <p className={styles.description}>
          footer
        </p>
      </footer>

    </div>
  )
}
