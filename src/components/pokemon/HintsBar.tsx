'use client';
import { useHiddenPokemon } from "@/context/HiddenPokemonContext";

import { playCry } from "@/utils/playCry";
import HintBox from "../HintBox";
import Image from 'next/image'
import { useState } from "react";
import Popup from "../Popup";
import { DexEntry } from "./types";
import { getEntry } from "@/utils/getPokemon";
type HintsBarProps = {
  volume: number
  numGuesses:number
}
export default function HintsBar({volume, numGuesses}:HintsBarProps) {

    const { hiddenPokemon } = useHiddenPokemon();
    return (
        <>
        {hiddenPokemon && (
            <div className="my-4 flex flex-row gap-2">
              <HintBox minGuesses={3} currentNum={numGuesses} hint="Pokemon Cry "icon="/sound.svg">
                <PokeCryHint cry={hiddenPokemon.cry} volume={volume}/>
              </HintBox>
              <HintBox minGuesses={5} currentNum={numGuesses} hint="Dex Entry"icon="/pokedex.svg">
                <DexEntryHint />
              </HintBox>
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
    <div onClick={() => playCry(cry, volume)} className="flex items-center justify-center size-full flex-col">
       <Image className="" width={24} height={24} src="/sound.svg" alt="Play to hear the hidden pokemon cry!"/>
       <p className="text-xs">Pokemon Cry</p>
    </div>
  );
}
function DexEntryHint() {
  const [entry, setEntry] = useState<DexEntry>()
  const [isShown, setIsShown] = useState<boolean>(false)
  const { hiddenPokemon } = useHiddenPokemon();
  console.log(hiddenPokemon)
  const handleOnClick = async() =>{
   
    if(!entry && hiddenPokemon){
      setEntry(await getEntry(hiddenPokemon.id))

    }
  
    setIsShown(true)
  }
  
  return (
    <>
    <div className="flex items-center justify-center size-full flex-col" onClick={handleOnClick}>
       <Image className="" width={24} height={24} src="/pokedex.svg" alt="Click to see the dex entry!"/>
       <p className="text-xs">Dex Entry</p>
    </div>
    <Popup isShown={isShown} setIsShownAction={setIsShown}>
      {entry ? 
        <p>{entry.entry}</p>
        :
        <p>Loading...</p>
      }
    </Popup>
    </>

  );
}
