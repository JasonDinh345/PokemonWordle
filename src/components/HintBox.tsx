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
        <div className={`w-32 h-16 border-2 border-stone-800 rounded-2xl overflow-hidden shadow-[4px_5px_3px_gray] ${minGuesses < currentNum && `cursor-pointer`}`}>
            {minGuesses > currentNum ? (
                <>
                <div className=" bg-red-300 p-1 flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6">
                        <Image
                            src={icon}
                            alt={`Hint box to unlock ${hint}`}
                            fill
                            className="object-contain"
                        />
                    </div>
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