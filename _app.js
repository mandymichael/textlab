import "../styles/global.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/pages/fonts/RobotoFlex.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
