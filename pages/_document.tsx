import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {

  return (
    <Html lang="en">
      <Head >
        <link rel="manifest" href="/manifest.json" />
        <script src="https://sad.adsgram.ai/js/sad.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
