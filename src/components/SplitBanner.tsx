"use client"
import { ReactElement, createContext } from "react";
import SplitBannerChild from "./SplitBannerChild";
import { useWindowSize } from "@/hooks/useWindowSize";


export const SplitBannerContext = createContext(true);
type SplitBannerProps = {
    children: [ReactElement<typeof SplitBannerChild>, ReactElement<typeof SplitBannerChild>, ReactElement<typeof SplitBannerChild>];
  
    className?: string;
};
export default function SplitBanner({ children, className }: SplitBannerProps) {
    const {width} = useWindowSize();
    return (
        <SplitBannerContext.Provider value={true}>
            <div className={`w-full h-32 flex flex-col items-center justify-center bg-stone-200 md:h-54 lg:h-84 ${className ? className : ""}`}>
                <div className={`flex flex-row items-center justify-center gap-8 lg:gap-16 h-full`}>
                    {children[0]}
                    {children[1]}
                    {children[2]}
                </div>
                {width<1024 && <p className="pb-2">Touch to see details!</p>}
            </div>
        </SplitBannerContext.Provider>
    );
}

