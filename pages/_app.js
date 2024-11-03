import "../styles/global.css";
import Head from "next/head";
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="./fonts/RoslindaleDisplay-Bold-subset.woff2"
          crossOrigin
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
