import "../styles/global.css";
// import localFont from "next/font/local";
import Head from "next/head";

// const roboto = localFont({ src: "./fonts/RobotoFlex.woff2" });
// const roslindale = localFont({
//   src: "./fonts/RoslindaleVariable.woff2",
// });

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link
          rel="preload"
          href="/_next/static/media/RobotoFlex.801b1a15.woff2"
          as="font"
          type="font/woff2"
          crossOrigin
        /> */}
      </Head>
      {/* <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }

        h1 {
          font-family: ${roslindale.style.fontFamily};
        }
      `}</style> */}
      <Component {...pageProps} />
    </>
  );
}

export default App;
