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
        <div className="uk-padding uk-padding-remove-bottom">
          <p className="uk-text">Find me in:</p>
        </div>
        <div className="uk-flex uk-flex-center uk-width-1-1">
          <div className='uk-padding-small'>
            <a href="https://www.instagram.com/lau_llc/" className="uk-icon-button"><img src='icons/instagram.svg' /></a>
          </div>
          <div className='uk-padding-small'>
            <a href="https://www.facebook.com/entre.nusos" className="uk-icon-button"><img src='icons/behance.svg' /></a>
          </div>
          <div className='uk-padding-small'>
            <a href="" className="uk-icon-button"><img src='icons/linkedin.svg' /></a>
          </div>
        </div>
        {/* <hr/> */}
        <div className="uk-padding uk-padding-remove-bottom">
          <p className="uk-text">Or send me an email:</p>
        </div>
        <div className="uk-width-2-5@s">
          <form class="uk-form-stacked">
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Name:</label>
              <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" placeholder="Your name..." />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Email:</label>
              <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="email" placeholder="Your email..." />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Message:</label>
              <div class="uk-form-controls">
                <textarea class="uk-textarea" rows="7" placeholder="Write your message..."></textarea>
              </div>
            </div>
          </form>
        </div>

      </main>

      <footer>
      </footer>

    </div>
  )
}
