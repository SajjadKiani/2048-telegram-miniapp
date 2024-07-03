import { GameContext } from "@/context/game-context";
import { updateUser } from "@/lib";
import styles from "@/styles/score.module.css";
import { useContext, useEffect } from "react";
import { useAds } from "@/context/ads-context";

// Define the types based on the external library's API


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
      adsController.show().then((result) => {
            console.log(result);
        }).catch((result) => {
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
