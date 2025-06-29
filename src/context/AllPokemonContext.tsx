'use client'; 
import { getAllPokemonInGen, getPokemon } from '@/utils/getPokemon';
import { Pokemon, SimpleData } from '@/components/pokemon/types';
import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { allGenerations } from '@/utils/allGenerations';
import { useChosenGenerations } from './ChosenGenerationContext';
type AllPokemonContextType = {
    pokemonList : SimpleData[],
    getRandomPokemon: () => Promise<Pokemon>;
    error: string | null
    isReady : boolean
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
    const [loadedGenerations, setLoadedGenerations] = useState<Set<number>>(new Set());
    const {chosenGenerations} = useChosenGenerations();
    const [isReady, setIsReady] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    //do a is ready
    useEffect(() => {
       
        setIsReady(false)
        const fetchGens = async () => {
            for (const genID of chosenGenerations) {
                if (!loadedGenerations.has(genID)) {
                    try {
                        const data = await getAllPokemonInGen(genID);
                        setAllPokemonByGeneration(prev => ({
                            ...prev,
                            [genID]: data.pokemon_species
                        }));
                        setLoadedGenerations(prev => new Set(prev).add(genID));
                    } catch (err) {
                        console.log(err)
                        setError("Failed to load Pokémon data.");
                    }
                }
            }
        };
        
        fetchGens();
        setIsReady(true)
    }, [chosenGenerations, loadedGenerations]);

    const pokemonList = useMemo((): SimpleData[] => 
        chosenGenerations.flatMap(genID => allPokemonByGeneration[genID] || []),
    [allPokemonByGeneration]);
    //console.log(pokemonList)
    const getRandomPokemon = useCallback(async (): Promise<Pokemon> => {
        const name = pokemonList[Math.floor(Math.random() * pokemonList.length)].name;
        return await getPokemon(name);
    
    }, [pokemonList]);
    return(
         <AllPokemonContext.Provider value={{pokemonList, getRandomPokemon, error, isReady }}>
            {children}
        </AllPokemonContext.Provider>
    )
    
}
export const useAllPokemon = ()=>{
    const context = useContext(AllPokemonContext);
    if (!context) throw new Error("useAllPokemon must be used within AllPokemonProvider");
    return context;
}