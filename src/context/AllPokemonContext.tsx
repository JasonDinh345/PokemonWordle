'use client'; 
import { getPokemon } from '@/utils/getPokemon';
import { Pokemon } from '@/components/pokemon/types';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
type AllPokemonContextType = {
    allPokemon : Pick<Pokemon, 'name'| 'sprites'>[],
    getRandomPokemon: () => Promise<Pokemon>;
    error: string | null
}
const AllPokemonContext = createContext<AllPokemonContextType | undefined>(undefined)

export const AllPokemonProvider = ({children}:{children: ReactNode}) =>{
    const [allPokemon, setAllPokemon] = useState<Pick<Pokemon, 'name'| 'sprites'>[]>([])
    const [error, setError] = useState<string| null>(null)
    useEffect(() => {
        const fetchNames = async () => {
            try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1000');
            const data = await res.json();
            const pokemonData = data.results.map((p: { name: string; url: string }) => ({
                name: p.name,
                url: p.url
            }));
            setAllPokemon(pokemonData);
            } catch (error) {
            console.error("Failed to fetch Pokémon species:", error);
            setError("Failed to fetch all Pokemon!")
        }
        };

        fetchNames();
    }, []);
    const getRandomPokemon = async():Promise<Pokemon> =>{
        const pokemonName: string = allPokemon[Math.floor(Math.random() * allPokemon.length)].name
        const pokemon: Pokemon  = await getPokemon(pokemonName)  
        return pokemon
    }
    return(
         <AllPokemonContext.Provider value={{allPokemon, getRandomPokemon, error  }}>
            {children}
        </AllPokemonContext.Provider>
    )
    
}
export const useAllPokemon = ()=>{
    const context = useContext(AllPokemonContext);
    if (!context) throw new Error("useAllPokemon must be used within AllPokemonProvider");
    return context;
}