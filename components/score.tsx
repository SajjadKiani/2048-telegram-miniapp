import { GameContext } from "@/context/game-context";
import { updateUser } from "@/lib";
import styles from "@/styles/score.module.css";
import { useContext, useEffect, useState } from "react";
import { useAds } from "@/context/ads-context";

export default function Score() {
  const { score, userId } = useContext(GameContext);
  const [promises, setPromises] = useState<Promise<any>[]>([]);
  const {adsController} = useAds();
  const [lastAdMilestone, setLastAdMilestone] = useState<number>(0)

  const fetchScore = async () => {
    return updateUser({id: userId, score})
      .then(res => {
        // console.log(res);
      })
      .catch(error => 
        Promise.reject({error})
      )
  }

  useEffect(() => {

    if (score !== 0) { // Avoid sending initial 0 score
      const scorePromise = fetchScore().catch(error => ({ score, status: 'rejected', error }));
      setPromises(prevPromises => [...prevPromises, scorePromise]);

      // Process all promises after a score change
      Promise.allSettled(promises)
        .then(results => {
          console.log(results);
          setPromises([])
        });
    }

    const nextMilestone = Math.floor(score / 500) * 500;
    // ads
    if (adsController && score >= nextMilestone && nextMilestone > lastAdMilestone)
      adsController.show()
        .then((result) => {
            setLastAdMilestone(nextMilestone); // Update the last milestone
        }).catch((result) => {
          console.log(result);
        })
  }, [score, userId])

  return (
    <div className={styles.score}>
      Point
      <div>{score}</div>
    </div>
  );
}
