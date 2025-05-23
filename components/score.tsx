import { GameContext } from "@/context/game-context";
import { createAd, updateUser } from "@/lib";
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
    // ads
    if (score % 500 === 0 && adsController) {
      let adStatus = ''
      adsController.show()
      .then((result) => {
          adStatus = 'SUCCESS'
          console.log(result);
      })
      .catch((result) => {
        adStatus = 'FAIL'
        console.log(result);
      })
      .finally(() => {
        createAd({id: userId, status: adStatus})
          .then(res => {console.log(res)})
          .catch(err => {console.log(err)})
      })
      
    }
  }, [score, userId])

  return (
    <div className={styles.score}>
      Point
      <div>{score}</div>
    </div>
  );
}
