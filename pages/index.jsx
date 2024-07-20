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
import DailyScoreChart from "@/components/dailyScoreChart"
import {useTg} from "@/context/tg-context"
export default function Home() {

  const { setUserId, moveTiles } = useContext(GameContext);
  const searchParams = useSearchParams()
  const [user, setUser] = useState({name: 'Loading...'}) // TODO: use reducer
  const [version, setVersion] = useState(0)
  const {tg} = useTg()
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

    if (tg && tg.onEvent)
      tg.onEvent('viewportChanged', (e) => {
        e.preventDefault()
        console.log('move down');
        moveTiles('move_down');
      })

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

  return (
    <div className={styles.twenty48} style={{ display: 'flex', flexDirection: "column", height: '95vh', padding: 0 }}>
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
      
      <div style={{ textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px', paddingTop: '100px'}}>
        {loading && !tg ? 

          <Spinner /> 
          :
          <>
            <h1>
              {user?.name.replace('|', ' ')}
            </h1>
            <DailyScoreChart dailyScore={user.dailyScore ? user.dailyScore : dailyScore} />

            {/* <Link href="/play" style={{
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
            </Link> */}
          </>
        }

      </div>

      {/* <footer>
        <div>Made with ❤️ by Saji <br /> tgv {version} </div>
      </footer> */}
    </div>
  );
}
