'use client';
import { useHiddenPokemon } from "@/context/HiddenPokemonContext";

import { playCry } from "@/utils/playCry";
type HintsBarProps = {
  volume: number
}
export default function HintsBar({volume}:HintsBarProps) {

    const { hiddenPokemon } = useHiddenPokemon();
    return (
        <>
        {hiddenPokemon && (
            <div>
            <PokeCryHint cry={hiddenPokemon.cry} volume={volume}/>
            </div>
        )}
        </>
    );
}
type PokeCryHintProp = {
  cry: string
  volume: number
}
function PokeCryHint({cry, volume}:PokeCryHintProp) {


  return (
    <div>
      <button onClick={() => playCry(cry, volume)}>Play Me!</button>
    </div>
  );
}
