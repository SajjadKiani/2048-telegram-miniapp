import { GameContext } from "@/context/game-context";
import { updateUser } from "@/lib";
import styles from "@/styles/score.module.css";
import { useContext, useEffect } from "react";

export default function Score() {
  const { score, userId } = useContext(GameContext);

  const fetchScore = async () => {
    try {
      const response = await updateUser({id: userId, score})
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchScore , 5000);
    return () => clearInterval(intervalId)
  }, [score, userId])

  return (
    <div className={styles.score}>
      Point
      <div>{score}</div>
    </div>
  );
}
