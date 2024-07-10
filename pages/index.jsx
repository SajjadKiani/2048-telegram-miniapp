"use client"

import Head from "next/head";
import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {fetchUser, createUser} from "@/lib"
import Spinner from "@/components/spinner";
import { useContext } from "react";
import { GameContext } from "@/context/game-context";
import { useAds } from "@/context/ads-context";
import DailyScoreChart from "@/components/dailyScoreChart"

const loadTelegramScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.onload = resolve;
    script.onerror = reject;

    const adScript = document.createElement('script');
    adScript.src = 'https://sad.adsgram.ai/js/sad.min.js';
    adScript.onload = resolve;
    adScript.onerror = reject;

    document.head.appendChild(script);
    document.head.appendChild(adScript);
  });
};

export default function Home() {

  const { setUserId } = useContext(GameContext);
  const { setAdsController } = useAds()
  const searchParams = useSearchParams()
  const [user, setUser] = useState({name: 'Loading...'}) // TODO: use reducer
  const [version, setVersion] = useState(0)
  const [tg, setTg] = useState(undefined)
  const [loading, setLoading] = useState(true);

  // temp
  const dailyScore = [
    {
      "id": 1,
      "userId": 1,
      "date": "2024-07-08T00:00:00.000Z",
      "score": 200,
      "createdAt": "2024-07-08T07:55:47.513Z"
    },
    {
      "id": 2,
      "userId": 1,
      "date": "2024-07-09T00:00:00.000Z",
      "score": 400,
      "createdAt": "2024-07-08T07:55:47.513Z"
    },
    {
      "id": 3,
      "userId": 1,
      "date": "2024-07-10T00:00:00.000Z",
      "score": 100,
      "createdAt": "2024-07-08T07:55:47.513Z"
    },
  ]

  useEffect(() => {
    setVersion(tg && tg.version)

    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const initData = tg.initDataUnsafe
      let u;
      setLoading(true)
      fetchUser(initData.user.id)
        .then(res => {
          u = res.data
        })
        .catch (e => {
          const data = { 
            name: initData.user.first_name + '|' + initData.user.last_name,
            telegramId: `${initData.user.id}`,
            telegramUsername: initData.user.username,
            referredBy: initData?.start_param
          }
    
          createUser(data).then(res => {
            u = res.data
          })
          .catch(err => {
            console.log(err);
          })  
        }).finally (() => {
          setUser(u)
          setUserId(u.id)
          setLoading(false)
        })
    }
  }, [tg])


  useEffect(() => {
    console.log('useTelegram')

    const initializeTelegram = async () => {
      try {
        await loadTelegramScript();
        readyTg();
      } catch (error) {
        console.error('Failed to load Telegram script', error);
      }
    };

    function readyTg() {
      if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        console.log('Telegram WebApp is set');
        const tgData = window.Telegram.WebApp
        if (window.Adsgram) {
          setAdsController( window.Adsgram.init({ blockId: '261', debug: process.env.NODE_ENV !== 'production' }))
          console.log('ads initid');
        }
        try {
          tgData.enableClosingConfirmation()
        } catch {}
        setTg(tgData);
      } else {
        console.log('Telegram WebApp is undefined, retrying…');
        setTimeout(readyTg, 500);
      }
    }

    initializeTelegram()
  }, [])

  return (
    <div className={styles.twenty48} style={{ display: 'flex', flexDirection: "column", height: '100vh', padding: 0 }}>
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
      </Head> 
      {/* <div>
          mined token
        </div> */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>2048</h1>
        <div style={{ padding: '5px 20px', border: '3px solid #FF7F3E', borderRadius: '40%' , height: '30px', textAlign: 'center', color: '#FF7F3E', fontWeight: 900 }}>
          {user?.score}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '100px'}}>
        {loading && !tg ? 
          <Spinner /> 
          :
          <>
            <h1>
              {user?.name.replace('|', ' ')}
            </h1>
            <DailyScoreChart dailyScore={user.dailyScore ? user.dailyScore : dailyScore} />
          </>
        }
        <Link href="/play" style={{
            width: '60%',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: '#FF7F3E',
            color: 'white',
            borderRadius: '12px',
            marginTop: '10px',
            textDecoration: 'none'

        }}>
          Play 2048
        </Link>

        <div>
        <p>
          <Link href={'/leaderboard'}>
            Leaderboard
          </Link>
        </p>
        <p>
          <Link href={'/referral'}>
            Referral
          </Link>
        </p>
        </div>
      </div>

      <footer>
        <div>Made with ❤️ by Saji <br /> tgv {version} </div>
      </footer>
    </div>
  );
}
