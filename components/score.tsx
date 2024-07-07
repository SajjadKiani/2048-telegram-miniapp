import { GameContext } from "@/context/game-context";
import { updateUser } from "@/lib";
import styles from "@/styles/score.module.css";
import { useContext, useEffect, useState } from "react";
import { useAds } from "@/context/ads-context";

// Define the types based on the external library's API


export default function Score() {
  const { score, userId } = useContext(GameContext);
  const [promises, setPromises] = useState<Promise<any>[]>([]);
  const {adsController} = useAds();

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
      Promise.allSettled([scorePromise])
        .then(results => {
          console.log(results);
        });
    }

    // ads
    if (score % 5000 === 0 && adsController)
      adsController.show()
        .then((result) => {
            console.log(result);
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
