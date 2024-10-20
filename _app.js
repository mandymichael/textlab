import "../styles/global.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/pages/fonts/RobotoFlexSlice.6383e8ee.woff2"
          as="font"
          type="font/woff2"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
