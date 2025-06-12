'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image'
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

  const filteredPokemon: PokemonData[] = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0,10)

  return (
    <div className=' flex flex-col justify-center items-start'>
      <h1>Pokémon Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a Pokémon name"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filteredPokemon.length > 0 && query !== "" &&
        <div className="m-2 flex flex-col justify-start overflow-y-auto hide-scrollbar max-h-60 rounded-md p-2 inset-shadow-sm inset-shadow-stone-500 bg-red-300">
         
            {filteredPokemon.map((pokemon) => (
              <PokeSuggestion pokemon={pokemon} key={pokemon.name} />
            ))}
            {filteredPokemon.length === 10 &&
            <p className="text-sm text-gray-700 mt-2 text-center italic" >Refine your search to find more!</p>
            }
          
        </div>
      }
      
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
type SpriteData = {
  front_default: string
}
function PokeSuggestion({pokemon}:PokeSuggestionProp){
  const [pokemonData, setPokemonData] = useState<PokeSuggestionType | null>(null)
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
          <div className="flex flex-row justify-center items-center w-50 border-4 rounded-2xl border-stone-100 bg-white hover:border-red-500 hover:bg-stone-200 m-1 box-content shadow-md shadow-stone-500">
            <h2 className="flex justify-center items-center">{pokemon.name}</h2>
            <Image src={pokemonData.sprites.front_default} width={50} height={50} alt={pokemon.name} />
        </div>
        )
       
    )
}
