import Head from 'next/head'
import Header from '../Components/Header'
import randomize from "../utils/randomizeHeader"
import styles from '../styles/styles.module.css'
import WrokshopGallery from '../Components/WorkshopGallery'

export default function Workshops({ color, image }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulopez Arts | Talleres</title>
      </Head>

      <Header selected='Workshops' randColor={color} image={image} />

      <main className="uk-padding-large uk-padding-remove-top">
        <WrokshopGallery color={color} />
      </main>


      <footer>
        <a className="uk-button uk-button-text" href="#top" data-uk-scroll>
          ir arriba
        </a>
      </footer>

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