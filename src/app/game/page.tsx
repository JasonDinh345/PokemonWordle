

import PokeSearch from "../../components/pokemon/PokeSearch";
import PokeWordle from "../../components/pokemon/PokeWordle";
import { AllPokemonProvider } from "@/context/AllPokemonContext";
import { HiddenPokemonProvider } from "@/context/HiddenPokemonContext";
import { ChosenGenerationProvider } from "@/context/ChosenGenerationContext";
import GenerationChooser from "@/components/pokemon/GenerationChooser"; 
import HintsBar from "@/components/pokemon/HintsBar"

import { GameStateProvider } from "@/context/GameStateContext";





export default function Game() {
  

  

  return (
    <>
    <ChosenGenerationProvider>
      <AllPokemonProvider>
        <GameStateProvider>
          <HiddenPokemonProvider>
         
          <div className="flex flex-col justify-center items-center relative">
            
            <h1 className="text-5xl py-6 font-bold">Guess the Pokemon!</h1>
            <GenerationChooser/>
            <PokeSearch/>
            <HintsBar/>
            <PokeWordle/>
          </div>
            
          
          </HiddenPokemonProvider>
        </GameStateProvider>
      </AllPokemonProvider>
    </ChosenGenerationProvider>
    
    </>
  );
}
