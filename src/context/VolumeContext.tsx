'use client';
import { createContext, ReactNode, useContext, useState } from "react";
type VolumeContextType = {
    volume: number
    adjustVolume: (volume:number)=>void
}

const VolumeContext = createContext<VolumeContextType|undefined>(undefined)

export const VolumeProvider = ({ children }: { children: ReactNode }) => {
    const [volume, setVolume] = useState(25)

    const adjustVolume = (volume: number) =>{
        if(volume >= 0 && volume <= 100){
            setVolume(volume)
        }
    }
    console.log(volume)
    return(
        <VolumeContext.Provider value={{volume, adjustVolume}}>
            {children}
        </VolumeContext.Provider>
    )
}

export const useVolume = () => {
    const context = useContext(VolumeContext)
    if(!context){
        throw new Error("usePokeuseVolumemon must be used within VolumeProvider");
    }
    return context
}