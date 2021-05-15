import '../styles/global.css'
import Head from 'next/head'
import 'uikit'

export default function App({ Component, pageProps }) {
  return <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <script src="//widget.cloudinary.com/global/all.js" type="text/javascript"></script>
      <meta name="twitter:card" content="I am a biologist, illustrator and screenprinting artist. You can find me in Àrtica Studio. I enjoy using art to bring biodiversity closer to people." key="twcard" />
      <meta 
        name="description"
        content="I am a biologist, illustrator and screenprinting artist. I currently live and work in Barcelona. You can find me in Àrtica Studio. I enjoy using art to bring biodiversity closer to people."
      />
      <meta property="og:url" content="https://laulopezarts.com" key="ogurl" />
      <meta property="og:image" content="/images/mainLogo-background.png" key="ogimage" />
      <meta property="og:site_name" content="LauLopez Arts" key="ogsitename" />
      <meta property="og:title" content="LauLopez Arts" key="ogtitle" />
      <meta 
        property="og:description" 
        content="I am a biologist, illustrator and screenprinting artist. I currently live and work in Barcelona. You can find me in Àrtica Studio. I enjoy using art to bring biodiversity closer to people."
        key="ogdesc"
      />
    </Head>
    <Component {...pageProps} />

  </div>
}