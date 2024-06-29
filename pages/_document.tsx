import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {

  useEffect(() => {
    if (window.scrollY === 0) {
      window.scrollTo(0, 1);
    }
  }, [])

  return (
    <Html lang="en">
      <Head >
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
