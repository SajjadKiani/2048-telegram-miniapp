import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {

  return (
    <Html lang="en">
      <Head >
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        {/* <Script src="https://sad.adsgram.ai/js/sad.min.js"></Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
