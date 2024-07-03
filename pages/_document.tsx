import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {

  return (
    <Html lang="en">
      <Head >
        <link rel="manifest" href="/manifest.json" />
        <Script src="https://sad.adsgram.ai/js/sad.min.js"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
