import '../styles/global.css'
import Head from 'next/head'
import 'uikit'

export default function App({ Component, pageProps }) {
  return <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <script src="//widget.cloudinary.com/global/all.js" type="text/javascript"></script>
      <meta name="twitter:card" content="Soy ilustradora y mis intereses giran en torno al animalismo, el feminismo y la justicia social. Creo en el Arte como herramienta transformadora." key="twcard" />
      <meta 
        name="description"
        content="Soy ilustradora y mis intereses giran en torno al animalismo, el feminismo y la justicia social. Creo en el Arte como herramienta transformadora."
      />
      <meta property="og:url" content="https://laulopezarts.com" key="ogurl" />
      <meta property="og:image" content="/images/mainLogo-background.png" key="ogimage" />
      <meta property="og:site_name" content="LauLopez Arts" key="ogsitename" />
      <meta property="og:title" content="LauLopez Arts" key="ogtitle" />
      <meta 
        property="og:description" 
        content="Soy ilustradora y mis intereses giran en torno al animalismo, el feminismo y la justicia social. Creo en el Arte como herramienta transformadora."
        key="ogdesc"
      />
    </Head>
    <Component {...pageProps} />

  </div>
}