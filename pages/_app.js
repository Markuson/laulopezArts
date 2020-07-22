import '../styles/global.css'
import Head from 'next/head'
import 'uikit'

export default function App({ Component, pageProps }) {
  return <div>
    <Head>
    <link rel="icon" href="/favicon.ico" />
      <script src="//widget.cloudinary.com/global/all.js" type="text/javascript"></script>
    </Head>
    <Component {...pageProps} />

  </div>
}