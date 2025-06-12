"use client"

import { useState, useEffect } from "react"
import { SpriteData } from "./PokeSearch"
import Image from 'next/image'
import { usePokemon } from "@/context/PokeChoiceContext"
type PokeChoice = {
        name: string
        sprites: SpriteData
    }
export default function PokeWordle(){
    const {pokemonChoiceList} = usePokemon();
    const [choices, setChoices] = useState<PokeChoice[]>(pokemonChoiceList)
    useEffect(()=>{
        setChoices(pokemonChoiceList)
    },[pokemonChoiceList])
    return(
        <div>
            {choices.map(choice =>
                <PokeChoice pokemon={choice} key={choice.name}/>
            )}
        </div>
    )
}
type PokeChoiceProp = {
    pokemon: PokeChoice
}
function PokeChoice({pokemon}:PokeChoiceProp){

  
    return(
        pokemon  && (
          <div className="flex items-center justify-between px-4 py-2 hover:bg-red-100 cursor-pointer border-b-2 border-stone-200">
            <h2 className="capitalize">{pokemon.name}</h2>
            <Image src={pokemon.sprites.front_default} width={40} height={40} alt={pokemon.name} />
          </div>
        )
       
    )
}