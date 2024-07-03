import { GameContext } from "@/context/game-context";
import { updateUser } from "@/lib";
import styles from "@/styles/score.module.css";
import { useContext, useEffect } from "react";
import { useAds } from "@/context/ads-context";

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: 'load' | 'render' | 'playing' | 'destroy'; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

export default function Score() {
  const { score, userId } = useContext(GameContext);
  const {adsController} = useAds()

  const fetchScore = async () => {
    try {
      const response = await updateUser({id: userId, score})
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchScore , 5000);

    if (score % 10 === 0 && adsController)
      adsController.show().then((result: ShowPromiseResult) => {
            console.log(result);
        }).catch((result: ShowPromiseResult) => {
          console.log(result);
        })
    return () => clearInterval(intervalId)
  }, [score, userId])

  return (
    <div className={styles.score}>
      Point
      <div>{score}</div>
    </div>
  );
}
