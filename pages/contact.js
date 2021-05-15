import Head from 'next/head'
import Header from '../Components/Header'
import randomize from "../utils/randomizeHeader"
import styles from '../styles/styles.module.css'

export default function Contact({color, image}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>laulopez Arts | Contact</title>
      </Head>

      <Header selected='Contact'  randColor={color} image={image} />

      <main>
        <div className="uk-padding uk-padding-remove-bottom">
          <p className="uk-text">Find me in:</p>
        </div>
        <div className="uk-flex uk-flex-center uk-width-1-1">
          <div className='uk-padding-small'>
            <a href="https://www.instagram.com/lau_llc/" rel="noopener noreferrer" className="uk-icon-button"><img src='icons/instagram.svg' /></a>
          </div>
          <div className='uk-padding-small'>
            <a href="hhttps://www.behance.net/lau_llc" rel="noopener noreferrer" className="uk-icon-button"><img src='icons/behance.svg' /></a>
          </div>
          <div className='uk-padding-small'>
            <a href="" rel="noopener noreferrer" className="uk-icon-button"><img src='icons/linkedin.svg' /></a>
          </div>
        </div>
        {/* <hr/> */}
        <div className="uk-padding uk-padding-remove-bottom">
          <p className="uk-text">Or send me an email:</p>
        </div>
        <div className="uk-width-2-5@s">
          <form className="uk-form-stacked">
            <div className="uk-margin">
              <label className="uk-form-label" for="form-stacked-text">Name:</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="form-stacked-text" type="text" placeholder="Your name..." />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" for="form-stacked-text">Email:</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="form-stacked-text" type="email" placeholder="Your email..." />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" for="form-stacked-text">Message:</label>
              <div className="uk-form-controls">
                <textarea className="uk-textarea" rows="7" placeholder="Write your message..."></textarea>
              </div>
            </div>
            <button className="uk-button uk-button-default">Enviar</button>
          </form>
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