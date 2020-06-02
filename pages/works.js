import Head from 'next/head'

import styles from '../styles/styles.module.css'

export default function Works() {
    return (
        <div className={styles.container}>
            <Head>
                <title>laulopez Arts | Treballs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>
                    Treballs
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
