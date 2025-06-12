'use client'; 

import { SpriteData } from '@/app/game/PokeSearch';
import { createContext, useContext, useState, ReactNode } from 'react';

type PokemonContextType = {
  pokemonChoiceList: PokeChoice[];
  addChoice: (name: string) => void;
};

const PokemonChoiceContext = createContext<PokemonContextType | undefined>(undefined);
type PokeChoice = {
        name: string
        sprites: SpriteData
    }
export const PokemonChoiceProvider = ({ children }: { children: ReactNode }) => {
    const [pokemonChoiceList, setPokemonChoiceList] = useState<PokeChoice[]>([]);
    const addChoice = async(name:string)=>{
        const fetchData = async ():Promise<PokeChoice> => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const data = await res.json();
        
        return ({name: data.name, sprites: {front_default: data.sprites.front_default}}) as PokeChoice;
      };
      const newChoice:PokeChoice = await fetchData();
      const updatedList:PokeChoice[] = [...pokemonChoiceList, newChoice]
      setPokemonChoiceList(updatedList)
    }
    return (
        <PokemonChoiceContext.Provider value={{ pokemonChoiceList, addChoice }}>
            {children}
        </PokemonChoiceContext.Provider>
    );
};

export const usePokemon = () => {
  const context = useContext(PokemonChoiceContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};