import { PokemonChoiceProvider } from "@/context/PokeChoiceContext";
import PokeSearch from "./PokeSearch";
import PokeWordle from "./PokeWordle";


export default function Game() {
  return (
    <>
    <PokemonChoiceProvider>
      <div className="flex flex-col justify-center items-center">
        <PokeSearch/>
        <PokeWordle/>
      </div>
    </PokemonChoiceProvider>
    
    </>
  );
}
