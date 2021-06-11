import Head from 'next/head'
import Header from '../Components/Header'
import randomize from "../utils/randomizeHeader"
import styles from '../styles/styles.module.css'

export default function Workshops({color, image}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulopez Arts | Talleres</title>
      </Head>

      <Header selected='Workshops'  randColor={color} image={image} />

      <main>
        <div className="uk-padding uk-padding-remove-bottom">
          <p className="uk-text">Talleres:</p>
        </div>
      </main>

      <footer>
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