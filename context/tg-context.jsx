import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { GameContext } from "@/context/game-context";

const TgContext = createContext(undefined);

const TgProvider = ({children}) => {
    const [tg, setTg] = useState(undefined)
    const { setUserId, moveTiles } = useContext(GameContext);

    const loadTelegramScript = () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://telegram.org/js/telegram-web-app.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      async function readyTg () {
        await loadTelegramScript()
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
          console.log('Telegram WebApp is set');
          const tgData = window.Telegram.WebApp
          tgData.onEvent('viewportChanged', (e) => {
            // e.preventDefault()
            console.log('move down');
            moveTiles('move_down');
          })
          try {
            tgData.enableClosingConfirmation()
            tgData.disableVerticalSwipes()
            tgData.setHeaderColor('#faf8ef')
          } catch {}
          setTg(tgData);
        } else {
          console.log('Telegram WebApp is undefined, retrying…');
          setTimeout(readyTg, 500);
        }
      }

    useEffect(() => {
      readyTg()
    }, [])
    
    return <TgContext.Provider value={{ tg }}> {children} </TgContext.Provider>
}

const useTg = () => {
    const context = useContext(TgContext)

    if (context === undefined)
        throw new Error('useAuth must be within AuthProvider!')

    return context

}

export {TgProvider, useTg}