import "../styles/global.css";
import StyledJsxRegistry from "./registry";

function App({ Component, pageProps }) {
  return (
    <>
      <StyledJsxRegistry>
        <Component {...pageProps} />
      </StyledJsxRegistry>
    </>
  );
}

export default App;
