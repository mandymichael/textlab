import Header from "../components/header";
import Generic from "../styles/Generic.module.css";

export default function Layout({ children }) {
  return (
    <div className={Generic.pageContainer}>
      <style global jsx>{`
        @font-face {
          font-family: Roslindale;
          src: url(./fonts/RoslindaleDisplay-Bold-subset.woff2);
          weight: 700;
          font-display: swap;
        }

        @font-face {
          font-family: "Times Fallback";
          src: local("Times New Roman");
          size-adjust: 114%;
          ascent-override: 84%;
        }

        @font-face {
          font-family: Roboto;
          src: url(./fonts/RobotoFlex-SubsetSlicedExtra.woff2);
          weight: 100 1000;
          width: 25 151;
          font-display: optional;
        }

        h1 {
          font-family: Roslindale, "Times Fallback", serif;
        }

        body {
          font-family: Roboto, Arial, sans-serif;
        }
      `}</style>
      <Header />
      <main>{children}</main>
    </div>
  );
}
