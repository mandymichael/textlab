import "../styles/global.css";
import { useEffect } from "react";
function App({ Component, pageProps }) {
  useEffect(() => {
    console.log("scroll");
    window.history.scrollRestoration = "manual";
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default App;
