import { useEffect, useState } from 'react'
import Head from 'next/head'

import Header from '../Components/Header'
import Portfolio from '../Components/Portfolio'

import logic from '../logic'

import styles from '../styles/styles.module.css'

export default function Home() {
  const [imageArray, setImageArray] = useState([])

  useEffect(() => {
    (async() => {
      const response = await logic.getPhotos()
      console.log(response)

    })();
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>laulópez Arts</title>
      </Head>

    <Header selected="Home" />
    <main className="uk-padding-large uk-padding-remove-top">
      <div className="uk-animation-slide-top uk-padding">
        <ul className=" uk-breadcrumb uk-visible@s">
          <li><a href="">Screenprinting</a></li>
          <li><a href="">Ilustration</a></li>
          <li><a href="">Science</a></li>
          <li><a href="">Oter works</a></li>
        </ul>
      </div>

      <Portfolio />
    </main>

    <footer>
      <a className="uk-button uk-button-text" href="#top" data-uk-scroll>
        go to top
        </a>
    </footer>
    </div >
  )
}
