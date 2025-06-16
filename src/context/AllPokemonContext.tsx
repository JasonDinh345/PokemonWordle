'use client'; 
import { getAllPokemonInGen, getPokemon } from '@/utils/getPokemon';
import { Pokemon, SimpleData } from '@/components/pokemon/types';
import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { allGenerations } from '@/utils/allGenerations';
import { useChosenGenerations } from './ChosenGenerationContext';
type AllPokemonContextType = {
    pokemonList : SimpleData[],
    getRandomPokemon: () => Promise<Pokemon>;
    error: string | null
}
const AllPokemonContext = createContext<AllPokemonContextType | undefined>(undefined)

type GenerationID = keyof typeof allGenerations; // "Kanto" | "Johto" | ...
type GenerationNumber = (typeof allGenerations)[GenerationID]; // 1 | 2 | ... | 9

type PokemonByGeneration = Record<GenerationNumber, SimpleData[]>; 

export const AllPokemonProvider = ({children}:{children: ReactNode}) =>{
    
    const [allPokemonByGeneration, setAllPokemonByGeneration] = useState<PokemonByGeneration>(
        () => Object.fromEntries(
            Object.values(allGenerations).map(genID => [genID, []])
            ) as PokemonByGeneration
    ); 
    const {chosenGenerations} = useChosenGenerations();
    const [error, setError] = useState<string| null>(null)
    useEffect(() => {
        const updateGen = async (genID: number) => {
            const data = await getAllPokemonInGen(genID);
            setAllPokemonByGeneration(prev => ({
                ...prev,
                [genID]: data.pokemon_species
        }));
        }
        chosenGenerations.forEach((genID)=>{
            if(allPokemonByGeneration[genID]?.length === 0){
                updateGen(genID)
            }
        })
       
    }, [chosenGenerations]);

    const pokemonList = useMemo(():SimpleData[]=>{
        let list:SimpleData[] = []
        chosenGenerations.forEach(genID=>
            list = [...list, ...allPokemonByGeneration[genID]]
        )
        return list
    }, [chosenGenerations, allPokemonByGeneration])

    const getRandomPokemon = async():Promise<Pokemon> =>{
        const pokemonName: string = pokemonList[Math.floor(Math.random() * pokemonList.length)].name
        const pokemon: Pokemon  = await getPokemon(pokemonName)  
        return pokemon
    }
    return(
         <AllPokemonContext.Provider value={{pokemonList, getRandomPokemon, error  }}>
            {children}
        </AllPokemonContext.Provider>
    )
    
}
export const useAllPokemon = ()=>{
    const context = useContext(AllPokemonContext);
    if (!context) throw new Error("useAllPokemon must be used within AllPokemonProvider");
    return context;
}