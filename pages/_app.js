import "../styles/global.css";
import localFont from "next/font/local";

const roboto = localFont({ src: "./fonts/RobotoFlexSlice.woff2" });
const roslindale = localFont({
  src: "./fonts/RoslindaleDisplay-Bold-subset.woff2",
});

function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }

        h1 {
          font-family: ${roslindale.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default App;
