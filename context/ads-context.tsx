import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

const AdsContext = createContext<AdsContextType | undefined>(undefined);

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: 'load' | 'render' | 'playing' | 'destroy'; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

// Define the context type
interface AdsContextType {
  adsController?: AdsController;
  setAdsController: React.Dispatch<React.SetStateAction<AdsController | undefined>>
}

interface AdsController {
  show: () => Promise<ShowPromiseResult>;
  // Add other methods if needed
}

// Declare the global Adsgram object
interface Adsgram {
  init: (options: { blockId: string, debug: Boolean }) => AdsController;
}

// Extend the window interface to include Adsgram
declare global {
  interface Window {
      Adsgram: Adsgram;
  }
}

interface AdsProviderProps {
  children: ReactNode;
}

const AdsProvider: React.FC<AdsProviderProps> = ({children}) => {
    const [adsController, setAdsController] = useState<AdsController | undefined>(undefined)

    const loadAdsScript = () => {
      return new Promise((resolve, reject) => {
        const adScript = document.createElement('script');
        adScript.src = 'https://sad.adsgram.ai/js/sad.min.js';
        adScript.onload = resolve;
        adScript.onerror = reject;
    
        document.head.appendChild(adScript);
      });
    }

    const readyAds = async () => {
      try {
        await loadAdsScript()
        if (window.Adsgram) {
          setAdsController( window.Adsgram.init({ blockId: '261', debug: true }))
          console.log('ads inited!');
        }
      } catch (e) {
        console.log('Failed to load Telegram script', e);
      }
    }

    useEffect(() => {
      readyAds()
    }, [])
    
    return <AdsContext.Provider value={{ adsController, setAdsController }}> {children} </AdsContext.Provider>
}

const useAds = () => {
    const context = useContext(AdsContext)

    if (context === undefined)
        throw new Error('useAuth must be within AuthProvider!')

    return context

}

export {AdsProvider, useAds}