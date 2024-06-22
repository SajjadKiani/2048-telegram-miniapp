import Head from "next/head";
import Image from "next/image";
import Board from "@/components/board";
import Score from "@/components/score";
import styles from "@/styles/index.module.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    console.log(window.Telegram.WebApp.initData);
  }, [])
  
  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta
          name="description"
          content="Play 2048 Telegram Mini App"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon16.png" />
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head> 
      {/* <div>
          mined token
        </div> */}
      <header>
        <h1>2048</h1>
        <Score />
      </header>
      <main>
        <Board />
      </main>
      <div>
        <h2>
          🚀 <span>@0xjsd0k</span>
        </h2>
        <p>
          <a
            href="https://www.udemy.com/course/2048-in-react-and-nextjs/?couponCode=50DISCOUNT"
            target="_blank"
            rel="noopener"
          >
            Leaderboard
          </a>{" "}
        </p>
      </div>
      <footer>
        <div className={styles.socials}>
          <a
            href="https://github.com/sajjadkiani/2048-in-react"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="social-github.svg"
              alt="2048-in-react on GitHub"
              width={32}
              height={32}
            />
          </a>
          <a href="https://twitter.com/msokola" target="_blank" rel="noopener">
            <Image
              src="social-twitter.svg"
              alt="Matéush on Twitter"
              width={32}
              height={32}
            />
          </a>
        </div>
        <div>Made with ❤️ by Saji</div>
      </footer>
    </div>
  );
}
