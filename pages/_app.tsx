import type { AppProps } from "next/app";
import GameProvider from "@/context/game-context";
import {AdsProvider} from "@/context/ads-context"
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"
import BottomNavbar from '@/components/bottomNavbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdsProvider>
      <GameProvider>
        <Analytics />
        <Component {...pageProps} />
        <BottomNavbar />
      </GameProvider>
    </AdsProvider>
  );
}
