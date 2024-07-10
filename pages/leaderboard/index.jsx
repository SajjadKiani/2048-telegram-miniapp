"use client"

import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";
import {fetchUsers} from "@/lib"
import Link from "next/link";
import Spinner from '@/components/spinner'
import Image from "next/image";

export default function Leaderboard () {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
        .then(res => {
            setUsers(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
        })
  }, [])
  
  return (
    <div className={styles.twenty48} >
      <header style={{ textAlign: 'center' }}>
        <h1>Leaderboard</h1>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {!loading ? 
            users && users.map((user, index) => 
              <div key={index} style={{ backgroundColor: 'white', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 20px', boxShadow: ' 3px 6px 18px 0px rgba(0,0,0,0.12)', gap: '5px' }}>
                {index === 0 ? <Image src={'/gold.svg'} width="32" height="32" /> : 
                index === 1 ? <Image src={'/silver.svg'} width="32" height="32" /> : 
                index === 2 ? <Image src={'/bronze.svg'} width="32" height="32" /> :
                index+1 + ') '
                }
                <p style={{ flexGrow: 1 }}>
                {user.name.replace('|', ' ')}</p>
                <p>{user.score}</p>
              </div>
            )
            :
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        }
      </main>

      <footer style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href={'/'} >
            Back
        </Link>
      </footer>
      
    </div>
  );
}
