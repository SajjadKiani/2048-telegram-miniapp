import { createContext, useContext, useEffect, useState } from 'react'

const AdsContext = createContext(undefined)

const AdsProvider = ({children}) => {
    const [adsController, setAdsController] = useState(undefined)

    useEffect(() => {
        setAdsController( window.Adsgram.init({ blockId: '261', debug: process.env.NODE_ENV === 'development' }));
    },[])
    
    return <AdsContext.Provider value={{ adsController }}> {children} </AdsContext.Provider>
}

const useAds = () => {
    const context = useContext(AdsContext)

    if (context === undefined)
        throw new Error('useAuth must be within AuthProvider!')

    return context

}

export {AdsProvider, useAds}