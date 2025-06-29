"use client"
import { Pokemon } from "@/components/pokemon/types";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useAllPokemon } from "./AllPokemonContext";



type HiddenPokemonContextType = {
    hiddenPokemon : Pokemon | null
    resetHiddenPokemon : ()=> void
}
const HiddenPokemonContext = createContext<HiddenPokemonContextType | null>(null);

export const HiddenPokemonProvider = ({ children }: { children: ReactNode }) => {
    const [hiddenPokemon, setHiddenPokemon] = useState<Pokemon | null>(null);

    console.log(hiddenPokemon)
    const {getRandomPokemon, pokemonList} = useAllPokemon();

    const resetHiddenPokemon = useCallback(async()=>{
    
        if(pokemonList.length > 0){
            const pokemon: Pokemon = await getRandomPokemon();
            setHiddenPokemon(pokemon)
        }
        
    
    },[getRandomPokemon, pokemonList])
    
    useEffect(()=>{
        resetHiddenPokemon()
    },[resetHiddenPokemon, pokemonList])
    return (
        <HiddenPokemonContext.Provider value={{hiddenPokemon, resetHiddenPokemon}}>
            {children}
        </HiddenPokemonContext.Provider>
    );
};

export const useHiddenPokemon =  ()=>{
    const context = useContext(HiddenPokemonContext)
    if(!context){
        throw new Error("Must use useHiddenPokemon in HiddenPokemonProvider")
    }
    return context
}
