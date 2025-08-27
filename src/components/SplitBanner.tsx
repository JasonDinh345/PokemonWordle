"use client"
import { ReactElement, createContext } from "react";
import SplitBannerChild from "./SplitBannerChild";


export const SplitBannerContext = createContext(true);
type SplitBannerProps = {
    children: [ReactElement<typeof SplitBannerChild>, ReactElement<typeof SplitBannerChild>, ReactElement<typeof SplitBannerChild>];
  
    className?: string;
};
export default function SplitBanner({ children, className }: SplitBannerProps) {
    
    return (
        <SplitBannerContext.Provider value={true}>
            <div className={`w-full h-84 flex flex-row items-center justify-center gap-16 bg-stone-200 ${className ? className : ""}`}>
                {children[0]}
                {children[1]}
                {children[2]}
            </div>
        </SplitBannerContext.Provider>
    );
}

