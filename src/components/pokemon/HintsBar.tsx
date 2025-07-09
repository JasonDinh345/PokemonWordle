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
              <HintBox minGuesses={8} currentNum={numGuesses} hint="Shadow Sprite"icon="/pokeball.svg">
                <SpriteHint />
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
       <div className="border-2 border-stone-400 rounded-md overflow-hidden">
         <table className="border-separate border-spacing-0">
          <thead>
            <tr >
              <th className="border-2 border-stone-400 px-4 py-2 ">Game Version</th>
              <th className="border-2 border-stone-400 px-4 py-2">Entry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="capitalize border-2 border-stone-400 px-4 py-2 text-center">{entry.game}</td>
              <td className="border-2 border-stone-400 px-4 py-2">{entry.entry}</td>
            </tr>
          </tbody>
        </table>
       </div>
        :
        <p>Loading...</p>
      }
    </Popup>
    </>

  );
}
function SpriteHint(){
  const [isShown, setIsShown] = useState<boolean>(false)
  const { hiddenPokemon } = useHiddenPokemon();
 
  return(
    <>
    <div className="flex items-center justify-center size-full flex-col" onClick={()=>setIsShown(true)}>
       <Image className="" width={24} height={24} src="/pokeball.svg" alt="Click to see the shadow sprite!"/>
       <p className="text-xs">Shadow Sprite</p>
    </div>
    {isShown && (
      <Popup isShown={isShown} setIsShownAction={setIsShown}>
      {hiddenPokemon && (
        <Image  className="filter brightness-0"src={hiddenPokemon?.sprites.front_default} width={100} height={100}alt="Hidden Pokemon Sprite"></Image>
      )}
    </Popup>
    )}
    </>
  )
}
