"use client"
import { ReactNode, useContext, useState } from "react"
import { SplitBannerContext } from "./SplitBanner";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import Popup from "./Popup";
type SplitBannerChildProps = {
    icon: string
    alt:string
    children: ReactNode
}
export default function SplitBannerChild({icon, alt, children}:SplitBannerChildProps){
    const withinBanner = useContext(SplitBannerContext)
    const [isHovered, setIsHovered] = useState(false)
    const {width} = useWindowSize();
    if (!withinBanner) {
        throw new Error("SplitBannerChild must be used inside a SplitBanner")
    }
  
    return(
        <>
        <div className="w-1/5 flex flex-col justify-center items-center border-4 p-4 border-black h-4/5 rounded-4xl shadow-2xl/50 bg-white overflow-hidden lg:p-0"
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
            onClick={()=>setIsHovered(true)}
            
        >
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 relative">
                <Image src={icon} alt={alt} fill className="object-contain" />
            </div>
            {width > 640 ?
                <p className={`text-center font-bold duration-300 ease-in-out px-4 py-2 ${!isHovered ? "max-h-0 opacity-0 py-1" : "h-fit opacity-100 "}`}>{children}</p>
            :
                <>
                <Popup isShown={isHovered} setIsShownAction={setIsHovered}>
                    <p className={`text-center font-bold duration-300 ease-in-out px-4 ${!isHovered ? "max-h-0 opacity-0 py-1" : "h-fit opacity-100 "}`}>{children}</p>
                </Popup>
                </>
            }
        </div>
        </>
    )
}