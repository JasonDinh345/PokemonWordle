"use client"
import { allGenerations } from "@/utils/allGenerations";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type ChosenGenerationContextType = {
    chosenGenerations : number[]
    updatedChosenGenerations: (genName: string, type: "add" | "remove")=>  void
}
const ChosenGenerationContext = createContext<ChosenGenerationContextType | undefined>(undefined)

export const ChosenGenerationProvider = ({ children }: { children: ReactNode })=>{
    const [chosenGenerations, setChosenGenerations] = useState<number[]>([1])
    const updatedChosenGenerations = useCallback((genName: string, type: "add" | "remove") => {
        console.log("updatechosen")
        const genNum = allGenerations[genName];
        if (genNum === undefined){
            return;
        }
        if(type === "add"){
            setChosenGenerations(prev => ([...prev, genNum]))
        }else{
            if(chosenGenerations.length === 1){
                throw new Error("Must have at least one Generation active!")
            }
            const updatedList = chosenGenerations.filter(gen =>
            gen !== genNum
            )
            setChosenGenerations(updatedList)
        }
    }, [chosenGenerations]);
    return (
        <ChosenGenerationContext.Provider value={{chosenGenerations, updatedChosenGenerations}}>
            {children}
        </ChosenGenerationContext.Provider>
    )
}
export const useChosenGenerations = ()=>{
    const context = useContext(ChosenGenerationContext)
    if(!context){
        throw new Error("Must use useChosenGenerations in a ChosenGenerationProvider")
    }
    return context
}