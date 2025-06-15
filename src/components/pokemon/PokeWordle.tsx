"use client"

import { useState, useEffect } from "react"

import Image from 'next/image'
import { usePokemon } from "@/context/PokeChoiceContext"
import { Pokemon } from "./types";
import { colorMap, PokemonColor } from "@/app/utils/colorMap";

export default function PokeWordle(){
    const {pokemonChoiceList} = usePokemon();
    const [choices, setChoices] = useState<Pokemon[]>(pokemonChoiceList)
    useEffect(()=>{
        setChoices(pokemonChoiceList)
    },[pokemonChoiceList])
    return(
        <table>
            <thead>

                <tr>
                    {["Pokemon", "Name", "Type 1", "Type 2", "Weight (kg)", "Color", "Dex Number", "Gen"].map(header=>
                        <th className="px-4 py-2" key={header}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {choices.map(choice =>
                <PokeChoiceContianer pokemon={choice} key={choice.name}/>
            )}
            </tbody>
        </table>
    )
}
type PokeChoiceProp = {
    pokemon: Pokemon
}
function PokeChoiceContianer({pokemon}:PokeChoiceProp){
    console.log(pokemon)
    const color =pokemon.color.name as PokemonColor
    return(
        pokemon  && (
          <tr className="items-center justify-between px-4 py-2 hover:bg-red-100 cursor-pointer border-b-2 border-stone-200">
            <td className="flex items-center justify-center"> <Image src={pokemon.sprites.front_default} width={60} height={60} alt={pokemon.name} /></td>
            <td className="capitalize text-center ">{pokemon.name}</td>
            <td className="px-4 py-2"> <Image src={pokemon.types[0].name_icon} width={80} height={40} alt={pokemon.types[0].name} /></td>
            <td className="px-4 py-2 text-center"> {pokemon.types[1] ? <Image src={pokemon.types[1].name_icon} width={80} height={40} alt={pokemon.types[1].name}  />: "N/A"}</td>
            <td className="px-4 py-2 text-center capitalize">{pokemon.weight}</td>
            <td className="px-4 py-2 text-center capitalize"><div className={`${colorMap[color] || "bg-gray-200"}`}>{pokemon.color.name}</div></td>
            <td className="px-4 py-2 text-center capitalize">{pokemon.id}</td>
            <td className="px-4 py-2 text-center capitalize">{pokemon.generation.name.toUpperCase()}</td>
            
          </tr>
        )
       
    )
}