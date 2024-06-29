import Board from "@/components/board";
import Score from "@/components/score";
import styles from "@/styles/index.module.css";
import { createRef, useEffect } from "react";

export default function Home() {

  const boardRef = createRef()

  useEffect(() => {
    boardRef.current.focus()
    boardRef.current?.click()
  }, [])

  return (
    <div className={styles.twenty48}>
      <header>
        <h1>2048</h1>
        <Score />
      </header>
      <main ref={boardRef}>
        <Board />
      </main>
      <div>
        <h2 style={{ textAlign: 'center' }}>
          🚀 <span>@0xsjd0k</span>
        </h2>
      </div>
      
    </div>
  );
}
