// components/BottomNavbar.js

import Link from 'next/link';
import styles from '@/styles/bottomNavbar.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BottomNavbar = () => {

    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname);
    }, [router])

  return (
    <div className={styles.navbar}>
      <Link href="/" className={`${styles.navItem} ${router.pathname === '/' ? styles.active : ''}`}>
          <i className="fas fa-home"></i>
          <span>Home</span>
      </Link>
      <Link href="/play" className={`${styles.navItem} ${router.pathname === '/play' ? styles.active : ''}`}>
          <i className="fas fa-gamepad"></i>
          <span>Play</span>
      </Link>
      <Link href="/referral" className={`${styles.navItem} ${router.pathname === '/referral' ? styles.active : ''}`}>
          <i className="fas fa-coins"></i>
          <span>Earn</span>
      </Link>
      <Link href="/leaderboard" className={`${styles.navItem} ${router.pathname === '/leaderboard' ? styles.active : ''}`}>
          <i className="fas fa-user"></i>
          <span>Leaderboard</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
