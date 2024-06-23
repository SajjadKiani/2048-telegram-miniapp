"use client"

import Head from "next/head";
import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams()
  const [user, setUser] = useState([]) // TODO: use reducer
  const [initData, setInitData] = useState([]) // TODO: use init data

  const fetchUser = async (telegramId) => {
    try {
      const response = await fetch('/api/users/' + telegramId)
      if (response.status === '200')
        return await response.json()
      else (response.status === '404')
        return undefined
    } catch (e) {
      console.log(e);
    }
  }

  const createUser = async (data) => {
    try {
      const response = await fetch('/api/users/', data, {method: 'POST'})
      if (response.status === '200')
        return await response.json()
    } catch (e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    if (typeof(window.Telegram) !== undefined) 
      setInitData(window.Telegram.WebApp.initData);
    
    
    const telegramId = ''
    const referralParams = searchParams.get('ref')

    fetchUser(telegramId).then(res => {
      let user = res
      if (!user || user.length === 0) {
        const data = { 
          name: initData.user.firstname + '|' + initData.user.lastname,
          telegramId: initData.user.id,
          telegramUsername: initData.user.username,
          referredBy: referralParams ? referralParams : ''
        }
  
        createUser(data).then(res => {
          user = res
        })
      }
      setUser(user)
    })
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
      <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
      {/* <div>
          mined token
        </div> */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>2048</h1>
        <div style={{ padding: '5px 20px', border: '3px solid #FF7F3E', borderRadius: '40%' , height: '30px', textAlign: 'center', color: '#FF7F3E', fontWeight: 900 }}>
          0
        </div>
      </div>
      
      <div style={{ textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
        <h2>
        Welcome {user?.name}
        </h2>
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

        <p>
          <Link href={'/play'}>
            Leaderboard
          </Link>
        </p>
      </div>

      <footer>
        <div className={styles.socials}>
          <a
            href="https://github.com/SajjadKiani/2048-telegram-miniapp"
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
          <a href="" target="_blank" rel="noopener">
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
