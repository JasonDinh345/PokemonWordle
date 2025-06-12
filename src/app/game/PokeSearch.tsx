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
    <div>
      <h1>Pokémon Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a Pokémon name"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {filteredPokemon && query !== "" && (
          filteredPokemon.map((pokemon)=>
            <PokeSuggestion pokemon={pokemon} key={pokemon.name}/>
          )
      )}
      </div>
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
          <div className="flex flex-row justify-center items-center">
            <h2 className="flex justify-center items-center">{pokemon.name}</h2>
            <Image src={pokemonData.sprites.front_default} width={50} height={50} alt={pokemon.name} />
        </div>
        )
       
    )
}
