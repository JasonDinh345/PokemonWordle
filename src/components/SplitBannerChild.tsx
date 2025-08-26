"use client"
import { useContext } from "react"
import { SplitBannerContext } from "./SplitBanner";
import Image from "next/image";
type SplitBannerChildProps = {
    icon: string
    alt:string
    caption: string
}
export default function SplitBannerChild({icon, alt, caption}:SplitBannerChildProps){
    const withinBanner = useContext(SplitBannerContext);
    if (!withinBanner) {
        throw new Error("SplitBannerChild must be used inside a SplitBanner")
    }

    return(
        <>
        <div className="w-1/3 flex flex-col justify-center items-center">
            <Image width={150} height={150} src={icon} alt={alt}></Image>
            <p>{caption}</p>
        </div>
        </>
    )
}