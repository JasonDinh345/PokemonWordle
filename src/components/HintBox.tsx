import { ReactNode } from "react"
import Image from 'next/image'
type HintBoxProps = {
    minGuesses: number
    currentNum: number
    children: ReactNode
    icon: string
    hint: string
}
export default function HintBox({minGuesses, currentNum, icon, hint, children}: HintBoxProps){
    
    return(
        <>
        <div className="w-32 h-16 border-2 border-stone-400 rounded-2xl overflow-hidden ">
            {minGuesses > currentNum ? (
                <>
                <div className=" size-full bg-red-300 p-1 flex flex-col justify-center items-center">
                    <Image className=""width={24} height={24} src={icon} alt={`Hint box to unlock ${hint}`}/>
                    <p className="opacity-100 text-white text-xs text-center">{hint} in {minGuesses - currentNum} guesses!</p>
                </div>
                </>
            ):(
                children
            )}
            
        </div>
        </>
    )
}