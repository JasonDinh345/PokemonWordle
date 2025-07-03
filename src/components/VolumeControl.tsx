'use client'; 
import { useState } from "react"
import Image from 'next/image'

type VolumeContextProps = {
    volume: number
    setVolumeAction: (value: number)=>  void
}
export default function VolumeControl({volume, setVolumeAction}:VolumeContextProps){
    const [isHovered, setIsHovered] = useState(false)
    const adjustVolume = (volume: number) =>{
        if(volume >= 0 && volume <= 100){
            setVolumeAction(volume)
        }
    }
    return(
        <>
        <div onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}} className="absolute top-0 right-0 mr-10 mt-2 w-25 h-fit flex flex-col items-center justify-center">
            <div className="w-fit h-fit flex items-center justify-center border-2 border-stone-500 p-2 rounded-4xl hover:bg-stone-300" >
                <Image src="/sound.svg" width={32} height={32} alt="Sound Control"/>
            </div>
            {isHovered && (
                <input type="range" value={volume} onChange={(e)=>{adjustVolume(Number(e.target.value))}}/>
            )}
        </div>
        </>
        
    )
}