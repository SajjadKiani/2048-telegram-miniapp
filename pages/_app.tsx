import type { AppProps } from "next/app";
import GameProvider from "@/context/game-context";
import {AdsProvider} from "@/context/ads-context"
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdsProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </AdsProvider>
  );
}
