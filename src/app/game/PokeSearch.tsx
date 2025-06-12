'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image'
import { usePokemon } from '@/context/PokeChoiceContext';
type PokemonData = {
    name: string;
    url: string;
};

export default function PokeSearch() {
  const [query, setQuery] = useState("");
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([])
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchNames = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1000');
      const data = await res.json();
      const pokemonData = data.results.map((p: { name: string; url: string }) => ({
        name: p.name,
        url: p.url
      }));
      setPokemonList(pokemonData);
    } catch (error) {
      console.error("Failed to fetch Pokémon species:", error);
      setError("Error has Occured")
    }
  };

  fetchNames();
}, []);

  const matchingPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

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
        placeholder="Enter a Pokémon name"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {filteredPokemon.length > 0 && query !== "" && (
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
}

type PokeSuggestionProp = {
    pokemon: PokemonData
}
type PokeSuggestionType = {
  name: string
  sprites: SpriteData
}
export type SpriteData = {
  front_default: string
}
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
    return(
        pokemonData  && (
          <div className="flex items-center justify-between px-4 py-2 hover:bg-red-100 cursor-pointer border-b-2 border-stone-200" onClick={()=>addChoice(pokemonData.name)}>
            <h2 className="capitalize">{pokemon.name}</h2>
            <Image src={pokemonData.sprites.front_default} width={40} height={40} alt={pokemon.name} />
          </div>
        )
       
    )
}
