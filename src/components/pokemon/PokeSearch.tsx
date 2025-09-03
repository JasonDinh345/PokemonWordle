'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useAllPokemon } from '@/context/AllPokemonContext';
import { useGameState } from '@/context/GameStateContext';
import { PokeSuggestionType } from './types';
import { getPokemonSuggestion } from '@/utils/getPokemon';





export default function PokeSearch() {
  const [query, setQuery] = useState("");
  
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const {pokemonList, error, isReady} = useAllPokemon();
  
  const {pokemonChoiceList, addChoice} = useGameState();
  const matchingPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(query.toLowerCase()) && !pokemonChoiceList.some(choice=> choice.name === pokemon.name))
 
  const filteredPokemon = matchingPokemon.slice(0, 10);
 
  if(error){
    return <p className="text-sm text-gray-700 p-2 text-center italic color-red">{error}</p>
  }
  
  return (
  <div className="relative w-full max-w-sm">
    {isReady ? (
      <>
        <input
          type="text"
          id='pokeSearch'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter a Pokémon name"
          autoComplete="off"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        {filteredPokemon.length > 0 && query !== "" && isFocused && (
          <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg border hide-scrollbar inset-shadow-sm inset-shadow-stone-500">
            {filteredPokemon.map((pokemon) => (
              <PokeSuggestion pokemon={pokemon} key={pokemon.name} />
            ))}
            {matchingPokemon.length > 10 && (
              <p className="text-sm text-gray-700 p-2 text-center italic">
                Showing top 10 results. Refine your search to see more!
              </p>
            )}
          </div>
        )}
      </>
    ) : (
      <div className="p-4 text-center text-gray-700 italic">
        Loading Pokémon data...
      </div>
    )}
  </div>
);

  function PokeSuggestion({pokemon}:PokeSuggestionProp){
  const [pokemonData, setPokemonData] = useState<PokeSuggestionType | null>(null)
  useEffect(()=>{
    const fetchData = async () => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        const data = await getPokemonSuggestion(id ?? "")
        
        
        setPokemonData(data);
      };
      fetchData();
  },[pokemon.url])
  const handleClick = ()=>{
    const id = pokemon.url.split("/").filter(Boolean).pop();
    addChoice(id ?? "")
    setQuery("")
  }
    return(
        pokemonData  && (
          <div className="flex items-center justify-between px-4 py-2 hover:bg-red-100 cursor-pointer border-b-2 border-stone-200" onMouseDown={handleClick}>
            <h2 className="capitalize">{pokemon.name}</h2>
            <Image src={pokemonData.sprites.front_default} width={50} height={50} alt={pokemon.name} />
          </div>
        )
       
    )
  }

}

type PokeSuggestionProp = {
    pokemon: {name: string, url:string}
}


