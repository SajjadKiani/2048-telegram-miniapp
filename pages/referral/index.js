"use client"

import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";
import {fetchUsers} from "@/lib"
import Link from "next/link";

export default function Leaderboard () {

  const [users, setUsers] = useState([])
  const [uses, setUser] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
        .then(res => {
            setUsers(res)
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
            <p style={{ textAlign: 'center' }}>
                loading...
            </p>
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
