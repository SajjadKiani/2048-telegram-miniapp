import type { AppProps } from "next/app";
import GameProvider from "@/context/game-context";
import {AdsProvider} from "@/context/ads-context"
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdsProvider>
      <GameProvider>
        <Analytics />
        <Component {...pageProps} />
      </GameProvider>
    </AdsProvider>
  );
}
