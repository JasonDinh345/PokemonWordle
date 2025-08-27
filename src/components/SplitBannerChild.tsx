"use client"
import { ReactNode, useContext, useState } from "react"
import { SplitBannerContext } from "./SplitBanner";
import Image from "next/image";
type SplitBannerChildProps = {
    icon: string
    alt:string
    children: ReactNode
}
export default function SplitBannerChild({icon, alt, children}:SplitBannerChildProps){
    const withinBanner = useContext(SplitBannerContext)
    const [isHovered, setIsHovered] = useState(false)
    if (!withinBanner) {
        throw new Error("SplitBannerChild must be used inside a SplitBanner")
    }

    return(
        <>
        <div className="w-1/5 flex flex-col justify-center items-center gap-4 border-4 border-black h-4/5 rounded-4xl shadow-2xl/50 bg-white overflow-hidden "
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
        >
            <Image width={100} height={100} src={icon} alt={alt}></Image>
            <p className={`text-center font-bold duration-300 ease-in-out ${!isHovered ? "max-h-0 opacity-0 p-4" : "h-fit opacity-100 px-4"}`}>{children}</p>
        </div>
        </>
    )
}