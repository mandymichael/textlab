import "../styles/global.css";
import { useEffect } from "react";
function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default App;
