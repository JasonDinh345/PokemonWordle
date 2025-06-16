'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image'
import { usePokemon } from '@/context/PokeChoiceContext';
import { useAllPokemon } from '@/context/AllPokemonContext';



export default function PokeSearch() {
  const [query, setQuery] = useState("");
  
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const {pokemonChoiceList} = usePokemon();
  const {pokemonList, error} = useAllPokemon();

  const matchingPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(query.toLowerCase()) && !pokemonChoiceList.some(choice=> choice.name === pokemon.name))

  const filteredPokemon = matchingPokemon.slice(0, 10);
  if(error){
    return <p className="text-sm text-gray-700 p-2 text-center italic color-red">{error}</p>
  }
  
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={()=>setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
        placeholder="Enter a Pokémon name"
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
  </div>
  );

  function PokeSuggestion({pokemon}:PokeSuggestionProp){
  const [pokemonData, setPokemonData] = useState<PokeSuggestionType | null>(null)
  const {addChoice} = usePokemon();
  useEffect(()=>{
    const fetchData = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`);
        const data = await res.json();
        
        setPokemonData({name: data.name, sprites: {front_default: data.sprites.front_default}});
      };
      fetchData();
  },[pokemon.name])
  const handleClick = ()=>{
    addChoice(pokemon.name)
    setQuery("")
  }
    return(
        pokemonData  && (
          <div className="flex items-center justify-between px-4 py-2 hover:bg-red-100 cursor-pointer border-b-2 border-stone-200" onMouseDown={handleClick}>
            <h2 className="capitalize">{pokemon.name}</h2>
            <Image src={pokemonData.sprites.front_default} width={40} height={40} alt={pokemon.name} />
          </div>
        )
       
    )
  }

}

type PokeSuggestionProp = {
    pokemon: {name: string, url:string}
}
type PokeSuggestionType = {
  name: string
  sprites: {
    front_default: string
  }
}

