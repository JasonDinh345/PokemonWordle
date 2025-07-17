"use client";

import PokeSearch from "../../components/pokemon/PokeSearch";
import PokeWordle from "../../components/pokemon/PokeWordle";
import { AllPokemonProvider } from "@/context/AllPokemonContext";
import { HiddenPokemonProvider } from "@/context/HiddenPokemonContext";
import { ChosenGenerationProvider } from "@/context/ChosenGenerationContext";
import GenerationChooser from "@/components/pokemon/GenerationChooser"; 
import HintsBar from "@/components/pokemon/HintsBar"


import { Pokemon } from "@/components/pokemon/types";
import { useEffect, useState } from "react";
import { getPokemon } from "@/utils/getPokemon";
import VolumeControl from "@/components/VolumeControl";


export default function Game() {
  const [pokemonChoiceList, setPokemonChoiceList] = useState<Pokemon[]>([]);
  const [volume, setVolume] = useState<number>(25)
  const [isGameOver, setIsGameOver]= useState<boolean>(false)

  const addChoice = async(name:string)=>{
          
    const result = await getPokemon(name);
    if(result){
      const newChoice = result as Pokemon
      const updatedList:Pokemon[] = [...pokemonChoiceList, newChoice]
      setPokemonChoiceList(updatedList)
    }
          
  }

  const resetChoices = ()=>{
    setPokemonChoiceList([])
  }
  return (
    <>
    <ChosenGenerationProvider>
      <AllPokemonProvider>
        <HiddenPokemonProvider>
         
          <div className="flex flex-col justify-center items-center relative">
            <VolumeControl volume={volume} setVolumeAction={setVolume}/>
            <h1 className="text-5xl py-6 font-bold">Guess the Pokemon!</h1>
            <GenerationChooser resetChoicesAction={resetChoices}/>
            <PokeSearch pokemonChoiceList={pokemonChoiceList} addChoiceAction={addChoice}/>
            <HintsBar volume={volume} numGuesses={pokemonChoiceList.length || 0}/>
            <PokeWordle pokemonChoiceList={pokemonChoiceList}/>
          </div>
            
          
        </HiddenPokemonProvider>
      </AllPokemonProvider>
    </ChosenGenerationProvider>
    
    </>
  );
}
