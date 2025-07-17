"use client"



import Image from 'next/image'

import { Pokemon } from "./types";
import { colorMap, PokemonColor } from "@/utils/colorMap";
import { useHiddenPokemon } from "@/context/HiddenPokemonContext";
import { comparePokemon, PokemonComparison } from "@/utils/comparePokemon";
import { useEffect, useState } from 'react';
import Popup from '../Popup';

type PokeWordleProps = {
    pokemonChoiceList: Pokemon[]
}
export default function PokeWordle({pokemonChoiceList}:PokeWordleProps){
    
    
    const {hiddenPokemon} = useHiddenPokemon();
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    useEffect(()=>{
        if(pokemonChoiceList.some(pokemon =>
            pokemon.name === hiddenPokemon?.name)){
                setIsGameOver(true)
            }
    },[hiddenPokemon, pokemonChoiceList])
    return(
        <>
        <table className="">
            <thead>

                <tr>
                    {["Pokemon", "Name", "Type 1", "Type 2", "Weight (kg)", "Color","Can Evolve?", "Dex Number", "Gen"].map(header=>
                        <th className="px-4 py-2" key={header}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {pokemonChoiceList.map(choice =>
                <PokeChoiceContianer pokemon={choice} key={choice.name}/>
            )}
            </tbody>
        </table>
        {isGameOver && (
            <Popup isShown={isGameOver} setIsShownAction={()=>setIsGameOver(false)}>
                {hiddenPokemon && (
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold'>Successfully guessed <span className='capitalize'>{hiddenPokemon.name}</span> in {pokemonChoiceList.length} guesses!</h1>
                        <Image src={hiddenPokemon.sprites.front_default} width={200} height={200} alt={hiddenPokemon.name} />
                        <button>Play Again</button>
                    </div>
                )}
            </Popup>
        )}
        </>
    )
    function PokeChoiceContianer({pokemon}:PokeChoiceProp){
    const correctness: PokemonComparison = comparePokemon(pokemon, hiddenPokemon!)
    const determineBGColor = (comparison: boolean) =>{
        if(comparison){
            return `bg-green-200`
        }
        return `bg-red-200`
    }
    const determineHintDirection = (direction? : "less" |  "greater"):string=>{
        if(direction){
            if(direction === "less"){
                return "▲"
            }else{
                return "▼"
            }
        }
        return ""
    }
    const color = pokemon.color.name as PokemonColor
    return(
        pokemon  && (
          <tr className="items-center justify-between px-4 py-2 hover:bg-red-100 cursor-pointer border-b-2 border-stone-200">
            <td className={`${determineBGColor(correctness.name.isEqual)} flex items-center justify-center`}> <Image src={pokemon.sprites.front_default} width={60} height={60} alt={pokemon.name} /></td>
            <td className={`${determineBGColor(correctness.name.isEqual)} capitalize text-center px-4 py-2`}>{pokemon.name}</td>
            <td className={`${determineBGColor(correctness.types[0].isEqual)} px-4 py-2`}> <Image src={pokemon.types[0].name_icon} width={80} height={40} alt={pokemon.types[0].name} /></td>
            <td className={`${determineBGColor(correctness.types[1].isEqual)} px-4 py-2 text-center`}> {pokemon.types[1] ? <Image src={pokemon.types[1].name_icon} width={80} height={40} alt={pokemon.types[1].name}  />: "N/A"}</td>
            <td className={`${determineBGColor(correctness.weight.isEqual)} px-4 py-2 text-center capitalize `}>{pokemon.weight}  {determineHintDirection(correctness.weight.direction)}</td>
            <td className={`${determineBGColor(correctness.color.isEqual)} px-4 py-2 text-center capitalize `}><div className={`${colorMap[color] || "bg-gray-200"} px-3 py-1 rounded-2xl`}>{pokemon.color.name}</div></td>
            <td className={`${determineBGColor(correctness.canEvolve.isEqual)} px-4 py-2 text-center capitalize `}>{pokemon.canEvolve ? "Yes" : "No"}</td>
            <td className={`${determineBGColor(correctness.id.isEqual)} px-4 py-2 text-center capitalize `}>{pokemon.id}  {determineHintDirection(correctness.id.direction)}</td>
            <td className={`${determineBGColor(correctness.generation.isEqual)} px-4 py-2 text-center capitalize `}>{pokemon.generation.name.toUpperCase()} {determineHintDirection(correctness.generation.direction)}</td>
            
          </tr>
        )
       
    )
}
}
type PokeChoiceProp = {
    pokemon: Pokemon
}
