import "../styles/global.css";
import localFont from "next/font/local";

// const roboto = localFont({ src: "./fonts/RobotoFlex.woff2" });
// const roslindale = localFont({ src: "./fonts/RoslindaleVariable.woff2" });

function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: BlinkMacSystemFont, —apple-system, "Segoe UI",
            "Oxygen Sans", Ubuntu, sans-serif;
        }
        h1 {
          font-family: BlinkMacSystemFont, —apple-system, "Segoe UI",
            "Oxygen Sans", Ubuntu, sans-serif;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default App;
