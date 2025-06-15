import { PokemonChoiceProvider } from "@/context/PokeChoiceContext";
import PokeSearch from "../../components/pokemon/PokeSearch";
import PokeWordle from "../../components/pokemon/PokeWordle";


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
