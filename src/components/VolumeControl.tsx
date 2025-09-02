'use client'; 
import { useState } from "react"
import Image from 'next/image'
import { useGameState } from "@/context/GameStateContext";

export default function VolumeControl(){
    const [isHovered, setIsHovered] = useState(false)
    const {volume, setVolume} = useGameState();
    const adjustVolume = (volume: number) =>{
        if(volume >= 0 && volume <= 100){
            setVolume(volume)
        }
    }
    return(
        <>
        <div onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}} onClick={()=>setIsHovered(!isHovered)}className=" lg:absolute lg:top-0 lg:right-0 lg:mr-10 mt-2 w-25 h-fit flex flex-col items-center justify-center">
            <div className="w-fit h-fit flex items-center justify-center border-2 border-stone-500 p-2 rounded-4xl hover:bg-stone-300 cursor-pointer" >
                <Image src="/sound.svg" width={32} height={32} alt="Sound Control"/>
            </div>
            {isHovered && (
                <input type="range" className="cursor-pointer "value={volume} onChange={(e)=>{adjustVolume(Number(e.target.value))}}/>
            )}
        </div>
        </>
        
    )
}