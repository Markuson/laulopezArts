import { useEffect, useState } from 'react'
import Head from 'next/head'

import Header from '../Components/Header'
import PortfolioGallery from '../Components/PortfolioGallery'

import logic from '../logic/app'

import styles from '../styles/styles.module.css'

export default function Home() {
  const [imageList, setImageList] = useState([])
  const [section, setSection] = useState(undefined)

  useEffect(() => {
    (async() => {
      let response
      if (section=='undefined'){
        response = await logic.getImages(undefined)
      }else {
        response = await logic.getImages(section)
      }
      setImageList(response)

    })();
  }, [section])

  return (
    <div className={styles.container}>
      <Head>
        <title>laulópez Arts</title>
      </Head>

    <Header selected="Home" />
    <main className="uk-padding-large uk-padding-remove-top">
      <div className="uk-animation-scale-up uk-padding">
        <ul className=" uk-breadcrumb uk-visible@m">
        <li><a onClick={() => setSection(undefined)}>All my works</a></li>
          <li><a onClick={() => setSection('screenprinting')}>Screenprinting</a></li>
          <li><a onClick={() => setSection('ilustration')}>Ilustration</a></li>
          <li><a onClick={() => setSection('science')}>Science</a></li>
          <li><a onClick={() => setSection('other')}>Other works</a></li>
        </ul>
          <select
            className="uk-select uk-hidden@m  "
            onChange={(e) => console.log(e.target.value)}
            id='sectionSelect'
            defaultValue={undefined}
          >
            <option value='undefined'>All my works</option>
            <option value="screenprinting">Screenprinting</option>
            <option value="ilustration">Ilustration</option>
            <option value="science">Science</option>
            <option value="other">Other</option>
          </select>
      </div>

      <PortfolioGallery imageList={imageList} />
    </main>

    <footer>
      <a className="uk-button uk-button-text" href="#top" data-uk-scroll>
        go to top
        </a>
    </footer>
    </div >
  )
}
