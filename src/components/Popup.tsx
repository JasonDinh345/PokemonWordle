import { ReactNode } from "react";
type PopupProps = {
    children:ReactNode
    isShown: boolean
    setIsShownAction: (active:boolean) => void
}
export default function Popup({children, isShown, setIsShownAction}: PopupProps){
    
    return (
        <div className={isShown ? "fixed bg-black/50 w-screen h-screen z-3 top-0 left-0 flex justify-center items-center" : "hidden"} >
            <div className="bg-white opacity-100 size-fit px-4 py-2 border-4 border-stone-400 rounded-2xl flex flex-col relative">
                <p className="self-end text-right font-bold cursor-pointer w-fit"onClick={()=>{setIsShownAction(false)}}>X</p>
                {children}
            </div>
        </div>
    )
}