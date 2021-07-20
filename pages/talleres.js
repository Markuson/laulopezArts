import Head from 'next/head'
import Header from '../Components/Header'
import { connectToDatabase } from "../utils/mongodb";
import WrokshopGallery from '../Components/WorkshopGallery'
import randomize from "../utils/randomizeHeader"
import styles from '../styles/styles.module.css'

export default function Workshops({ color, image, workshops }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulopez Arts | Talleres</title>
      </Head>

      <Header selected='Workshops' randColor={color} image={image} />

      <main className="uk-padding-large uk-padding-remove-top">
        {!!workshops && <WrokshopGallery workshops={workshops} color={color} />}
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
  const { db } = await connectToDatabase();

  const workshop = await db
    .collection("workshops")
    .find({})
    .toArray()

  const { color, image } = randomize()
  return {
    props: {
      workshops: workshop == null ? [] : JSON.parse(JSON.stringify(workshop)),
      image,
      color
    },
  };
}