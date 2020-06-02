import Head from 'next/head'

import styles from '../styles/styles.module.css'

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulopez Arts | contacte</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
