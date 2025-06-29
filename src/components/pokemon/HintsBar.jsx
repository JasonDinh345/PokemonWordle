'use client';
import { useHiddenPokemon } from "@/context/HiddenPokemonContext";
import { useVolume } from "@/context/VolumeContext";
import { playCry } from "@/utils/playCry";

export default function HintsBar() {

    const { hiddenPokemon } = useHiddenPokemon();
    return (
        <>
        {hiddenPokemon && (
            <div>
            <PokeCryHint cry={hiddenPokemon.cry}/>
            </div>
        )}
        </>
    );
}

function PokeCryHint({cry}) {
  const { volume } = useVolume();

  return (
    <div>
      <button onClick={() => playCry(cry, volume)}>Play Me!</button>
    </div>
  );
}
