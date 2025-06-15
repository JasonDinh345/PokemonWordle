import { PokemonChoiceProvider } from "@/context/PokeChoiceContext";
import PokeSearch from "../../components/pokemon/PokeSearch";
import PokeWordle from "../../components/pokemon/PokeWordle";
import { AllPokemonProvider } from "@/context/AllPokemonContext";
import { HiddenPokemonProvider } from "@/context/HiddenPokemonContext";


export default function Game() {
  return (
    <>
    <AllPokemonProvider>
      <HiddenPokemonProvider>
        <PokemonChoiceProvider>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl py-6 font-bold">Guess the Pokemon!</h1>
            <PokeSearch />
            <PokeWordle/>
          </div>
        </PokemonChoiceProvider>
      </HiddenPokemonProvider>
    </AllPokemonProvider>
    
    </>
  );
}
