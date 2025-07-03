"use client"
import { Pokemon } from "@/components/pokemon/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAllPokemon } from "./AllPokemonContext";




type HiddenPokemonContextType = {
    hiddenPokemon : Pokemon | null

}
const HiddenPokemonContext = createContext<HiddenPokemonContextType | null>(null);

export const HiddenPokemonProvider = ({ children }: { children: ReactNode }) => {
    const [hiddenPokemon, setHiddenPokemon] = useState<Pokemon | null>(null);

    
    const {getRandomPokemon, pokemonList, isReady} = useAllPokemon();

   

useEffect(() => {

  if (isReady && pokemonList.length > 0) {
    (async () => {
      
     
      const pokemon = await getRandomPokemon();
    
      
      setHiddenPokemon(pokemon);
    })();
  }
}, [isReady, pokemonList, getRandomPokemon]);


    return (
        <HiddenPokemonContext.Provider value={{hiddenPokemon}}>
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
