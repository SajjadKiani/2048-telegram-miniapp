"use client"

import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";
import {fetchTopReferrals} from "@/lib"
import Link from "next/link";
import Spinner from '@/components/spinner'

export default function Leaderboard () {

  const [users, setUsers] = useState([])
  const [uses, setUser] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopReferrals()
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
        <h1>Referrals</h1>
      </header>
      <main>
        {!loading ? 
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>referrals</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) =>
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>{user.name}</td>  
                            <td style={{ textAlign: 'center' }}>{user.score}</td>
                        </tr>
                    )}
                </tbody>

            </table>
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
