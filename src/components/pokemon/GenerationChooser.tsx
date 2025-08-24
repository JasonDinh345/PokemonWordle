"use client"
import { allGenerations } from "@/utils/allGenerations";
import ButtonCheckBox from "../ButtonCheckBox";
import { useMemo } from "react";
import { useChosenGenerations } from "@/context/ChosenGenerationContext";
import { useAllPokemon } from "@/context/AllPokemonContext";
import { useGameState } from "@/context/GameStateContext";



export default function GenerationChooser(){
    const {resetGame} = useGameState();
    const allGens = useMemo(()=>Object.keys(allGenerations),[])
    const {chosenGenerations, updatedChosenGenerations} = useChosenGenerations();
    const {setIsReady} = useAllPokemon()

    const handleOnClick = (genName: string, checked: boolean)=>{
        if(checked){
            updatedChosenGenerations(genName, "add")
        }else{
            updatedChosenGenerations(genName, "remove")
        }
        setIsReady(false)
        resetGame()
    }
    return(
        <>
        <h1 className="text-xl py-6 ">Choose Which Generation to Include!</h1>
        <div className="flex flex-row gap-2 pb-6">
            {allGens.map(genName =>
                <ButtonCheckBox onClickAction={(checked:boolean)=>handleOnClick(genName, checked)} key={genName} label={genName} isChecked={chosenGenerations.includes(allGenerations[genName])}/>
            )}
        </div>
        </>
    )
}