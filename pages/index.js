import { useEffect, useState } from 'react'
import Head from 'next/head'
import { connectToDatabase } from "../utils/mongodb";
import randomize from "../utils/randomizeHeader"
import Header from '../Components/Header'
import PortfolioGallery from '../Components/PortfolioGallery'
import logic from '../logic/app'
import styles from '../utils/styles/styles.module.css'

export default function Home({ portfolio, image, color }) {
  const [imageList, setImageList] = useState([])
  const [section, setSection] = useState(undefined)

  useEffect(() => {
    let result = logic.getImages(portfolio, section)
    setImageList(result)
  }, [section])

  return (
    <div className={styles.container}>
      <Head>
        <title>laulópez Arts</title>
      </Head>

      <Header selected="Home" randColor={color} image={image} />
      <main className="uk-padding-large uk-padding-remove-top">
        <div className="uk-animation-scale-up uk-padding">
          <ul className=" uk-breadcrumb uk-visible@m">
            <li><a onClick={() => setSection(undefined)}>Todo</a></li>
            <li><a onClick={() => setSection('screenprinting')}>Serigrafía</a></li>
            <li><a onClick={() => setSection('ilustration')}>Ilustración</a></li>
            <li><a onClick={() => setSection('science')}>Ciencia</a></li>
            <li><a onClick={() => setSection('other')}>Otras técnicas</a></li>
          </ul>
          <select
            className="uk-select uk-hidden@m  "
            onChange={(e) => setSection(e.target.value)}
            id='sectionSelect'
            defaultValue={undefined}
          >
            <option value='undefined'>Todo</option>
            <option value="screenprinting">Serigrafía</option>
            <option value="ilustration">Ilustración</option>
            <option value="science">Ciencia</option>
            <option value="other">Otras técnicas</option>
          </select>
        </div>
        <PortfolioGallery imageList={imageList} />
      </main>

      <footer>
        <a className="uk-button uk-button-text" href="#top" data-uk-scroll>
          ir arriba
        </a>
      </footer>
    </div >
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const portfolio = await db
    .collection("portfolios")
    .findOne({})

  const { color, image } = randomize()
  return {
    props: {
      portfolio: portfolio == null ? [] : JSON.parse(JSON.stringify(portfolio.sections)),
      image,
      color
    },
  };
}
