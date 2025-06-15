'use client'; 


import { Pokemon } from '@/components/pokemon/types';
import { createContext, useContext, useState, ReactNode } from 'react';

type PokemonContextType = {
  pokemonChoiceList: Pokemon[];
  addChoice: (value: string) => void;
};

const PokemonChoiceContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonChoiceProvider = ({ children }: { children: ReactNode }) => {
    const [pokemonChoiceList, setPokemonChoiceList] = useState<Pokemon[]>([]);
    const addChoice = async(name:string)=>{
        const fetchData = async ():Promise<Pokemon | undefined> => {
            try{
              const [res1, res2] = await Promise.all([
              fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`),
              fetch((`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`))
            ])
            const data1 = await res1.json();
            const data2 = await res2.json();
            
            const evoChainRes = fetch(data1.evolution_chain.url);
            const typePromises = data2.types.map(async (type: {slot: number, type: { name: string, url: string }}) => {
              const res = await fetch(type.type.url);
              const data = await res.json();
              return data;
            });

            const [evoRes, typesData] = await Promise.all([
              evoChainRes,
              Promise.all(typePromises)
            ]);
            const evoData = await evoRes.json()
            
            const pokemonData: Pokemon = {
              id: Number(data1.id), 
              name: data1.name,
              color: {
                name: data1.color.name
              },
              generation: {
                name : data1.generation.name.split("-")[1]
              },
              sprites: {
                front_default: data2.sprites.front_default
              },
              types: typesData.map(type=>{
                return {name: type.name, name_icon: type.sprites['generation-ix']["scarlet-violet"].name_icon }
              }),
              weight: data2.weight/10,
              evolution_chain: {chain: evoData.chain}
            }
            return pokemonData
          }catch(err){
            console.log(err)
          }
      
        }
        const result = await fetchData();
        if(result){
          const newChoice = result as Pokemon
          const updatedList:Pokemon[] = [...pokemonChoiceList, newChoice]
          setPokemonChoiceList(updatedList)
        }
        
    }
    console.log(pokemonChoiceList)
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