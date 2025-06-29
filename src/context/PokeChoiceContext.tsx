'use client'; 


import { getPokemon } from '@/utils/getPokemon';
import { Pokemon } from '@/components/pokemon/types';
import { createContext, useContext, useState, ReactNode } from 'react';

type PokemonContextType = {
  pokemonChoiceList: Pokemon[];
  addChoice: (name: string) => void;
  resetChoices: ()=> void
};

const PokemonChoiceContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonChoiceProvider = ({ children }: { children: ReactNode }) => {
    const [pokemonChoiceList, setPokemonChoiceList] = useState<Pokemon[]>([]);
    const addChoice = async(name:string)=>{
        
        const result = await getPokemon(name);
        if(result){
          const newChoice = result as Pokemon
          const updatedList:Pokemon[] = [...pokemonChoiceList, newChoice]
          setPokemonChoiceList(updatedList)
        }
        
    }
    const resetChoices = ()=>{
      setPokemonChoiceList([])
    }
    return (
        <PokemonChoiceContext.Provider value={{ pokemonChoiceList, addChoice, resetChoices }}>
        {children}
        </PokemonChoiceContext.Provider>
    );
};

export const usePokemon = () => {
  const context = useContext(PokemonChoiceContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};