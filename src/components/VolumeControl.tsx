'use client'; 
import { useState } from "react"
import Image from 'next/image'
import { useVolume } from "@/context/VolumeContext";
export default function VolumeControl(){
    const [isHovered, setIsHovered] = useState(false)
    const {volume, adjustVolume} = useVolume();
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