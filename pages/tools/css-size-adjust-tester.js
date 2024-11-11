import HeadBlock from "../../components/head";
import Generic from "../../styles/Generic.module.css";
import TextStyles from "../../styles/Text.module.css";
import HomeStyles from "../../styles/Home.module.css";
import ContainerStyles from "../../styles/Container.module.css";
import CSSSizeAdjustToolStyles from "../../styles/CSSSizeAdjustTool.module.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState, useEffect, useRef } from "react";

export default function CSSSizeAdjustTool() {
  const [sizeAdjust, setSizeAdjust] = useState(100);
  const [ascentOverride, setAscentOverride] = useState(100);
  const [descentOverride, setDescentOverride] = useState(100);
  const [enableAscent, setEnableAscent] = useState(false);
  const [enableDescent, setEnableDescent] = useState(false);
  const [fontFaceCSS, setFontFaceCSS] = useState(`
    @font-face {
      font-family: "Arial Fallback";
      src: local(Arial);
      size-adjust: 100%;
      ascent-override: normal;
      descent-override: normal;
    }
  `);
  const [fontUrl, setFontUrl] = useState("");
  const [fallbackFont, setFallbackFont] = useState("Arial");

  const sizeAdjustRef = useRef(null);
  const copyStylesRef = useRef(null);

  useEffect(() => {
    let myFontFace = `@font-face {
      font-family: "${fallbackFont} Fallback";
      src: local(${fallbackFont});
      size-adjust: ${sizeAdjust}%;
    `;

    myFontFace += `ascent-override: ${
      enableAscent ? ascentOverride + "%" : "normal"
    };`;

    myFontFace += `\n  descent-override: ${
      enableDescent ? descentOverride + "%" : "normal"
    };`;

    myFontFace += `\n}`;

    const customFontFace = `@font-face {
      font-family: CustomFont;
      src: url(${fontUrl});
      font-display: swap;
    }`;

    setFontFaceCSS(myFontFace);

    const style = document.createElement("style");
    style.innerHTML = myFontFace;

    const customFont = document.createElement("style");
    customFont.innerHTML = customFontFace;

    document.head.appendChild(style);
    document.head.appendChild(customFont);

    return () => {
      document.head.removeChild(style);
    };
  }, [
    sizeAdjust,
    ascentOverride,
    descentOverride,
    enableAscent,
    enableDescent,
    fontUrl,
    fallbackFont,
  ]);

  return (
    <div className={Generic.pageContainer}>
      <HeadBlock
        title="Tools | CSS size-adjust Tester"
        description="A little tool for testing Size Adjust"
        url="https://textlab.dev/tools/css-text-stats"
        image="/images/metadata/main-og3.jpg"
      />
      <GoogleAnalytics gaId="G-BKGWYR0HVY" />

      <main className={HomeStyles.main}>
        <Header />

        <section className={`${ContainerStyles.section} PageHeader`}>
          <div className={`${ContainerStyles.stacked}`}>
            <h1 className={TextStyles.heading}>CSS size-adjust Tester</h1>
          </div>
        </section>

        <section className={`${CSSSizeAdjustToolStyles.wrapper}`}>
          <div className={CSSSizeAdjustToolStyles.container}>
            <div className={CSSSizeAdjustToolStyles.fallback}>
              Little yellow Jello, eating my marshmallow. We boop your nose, and
              squish your toes. And let you run and chase the crows. Your little
              squishy face, and floopy little ears. Little floofy Jello.
            </div>
            <div className={CSSSizeAdjustToolStyles.custom}>
              Little yellow Jello, eating my marshmallow. We boop your nose, and
              squish your toes. And let you run and chase the crows. Your little
              squishy face, and floopy little ears. Little floofy Jello.
            </div>
          </div>

          <fieldset className={CSSSizeAdjustToolStyles.controls}>
            <div>
              <label htmlFor="fontUrl">Font URL</label>
              <input
                type="text"
                id="fontUrl"
                value={fontUrl}
                onChange={(e) => setFontUrl(e.target.value)}
                placeholder="Custom font url"
              />
            </div>
            <div>
              <label htmlFor="fallbackFont">Fallback Font Name</label>
              <input
                type="text"
                id="fallbackFont"
                value={fallbackFont}
                onChange={(e) => setFallbackFont(e.target.value)}
                placeholder="Fallback font name e.g. Arial"
              />
            </div>
            <div>
              <label htmlFor="sizeadjust">size-adjust</label>{" "}
              <input
                type="range"
                id="sizeadjust"
                name="sizeadjust"
                min="0"
                max="200"
                value="100"
                step="0.11"
                onChange={(e) => setSizeAdjust(e.target.value)}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="enableAscent"
                checked={enableAscent}
                onChange={(e) => setEnableAscent(e.target.checked)}
              />
              <label htmlFor="ascent">ascent-override</label>
              <input
                type="range"
                id="ascent"
                name="ascent"
                min="0"
                max="200"
                value={ascentOverride}
                onChange={(e) => setAscentOverride(e.target.value)}
                disabled={!enableAscent}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="enableDescent"
                checked={enableDescent}
                onChange={(e) => setEnableDescent(e.target.checked)}
              />
              <label htmlFor="descent">descent-override</label>
              <input
                type="range"
                id="descent"
                name="descent"
                min="0"
                max="200"
                value={descentOverride}
                onChange={(e) => setDescentOverride(e.target.value)}
                disabled={!enableDescent}
              />
            </div>
            <hr />
          </fieldset>
          <pre
            id="copyStyles"
            ref={copyStylesRef}
            className={CSSSizeAdjustToolStyles.codeCSS}
          >
            {fontFaceCSS}
          </pre>
          <p>Default is set to Roboto and Arial.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
