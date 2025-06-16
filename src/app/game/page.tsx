import { PokemonChoiceProvider } from "@/context/PokeChoiceContext";
import PokeSearch from "../../components/pokemon/PokeSearch";
import PokeWordle from "../../components/pokemon/PokeWordle";
import { AllPokemonProvider } from "@/context/AllPokemonContext";
import { HiddenPokemonProvider } from "@/context/HiddenPokemonContext";
import { ChosenGenerationProvider } from "@/context/ChosenGenerationContext";
import GenerationChooser from "@/components/pokemon/GenerationChooser";


export default function Game() {
  return (
    <>
    <ChosenGenerationProvider>
      <AllPokemonProvider>
        <HiddenPokemonProvider>
          <PokemonChoiceProvider>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-5xl py-6 font-bold">Guess the Pokemon!</h1>
              <GenerationChooser/>
              <PokeSearch />
              <PokeWordle/>
            </div>
          </PokemonChoiceProvider>
        </HiddenPokemonProvider>
      </AllPokemonProvider>
    </ChosenGenerationProvider>
    
    </>
  );
}
