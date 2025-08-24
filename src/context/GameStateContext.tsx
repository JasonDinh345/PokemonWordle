"use client"
import { Pokemon } from "@/components/pokemon/types";
import { getPokemon } from "@/utils/getPokemon";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAllPokemon } from "./AllPokemonContext";

type GameStateContextProps = {
    pokemonChoiceList: Pokemon[]
    volume: number
    hiddenPokemon: Pokemon | null
    setVolume: (number: number)=>  void
    isGameOver: boolean
    setIsGameOver: (isGameOver: boolean)=> void
    addChoice: (name: string)=>void
    resetGame: ()=> void
}
const GameStateContext = createContext<GameStateContextProps| undefined>(undefined)

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [hiddenPokemon, setHiddenPokemon] = useState<Pokemon | null>(null);
  
      
  const {getRandomPokemon, pokemonList} = useAllPokemon();
  console.log(hiddenPokemon)
   useEffect(() => {
   
     if (pokemonList.length > 0) {
       (async () => {
         const pokemon = await getRandomPokemon();
         setHiddenPokemon(pokemon);
       })();
     }
   }, [pokemonList, getRandomPokemon]);
    const addChoice = async(name:string)=>{
              
        const result = await getPokemon(name);
        if(result){
          const newChoice = result as Pokemon
          const updatedList:Pokemon[] = [...pokemonChoiceList, newChoice]
          setPokemonChoiceList(updatedList)
        }
              
      }
    const resetGame = async() =>{
      const pokemon = await getRandomPokemon();
      setHiddenPokemon(pokemon);
      setPokemonChoiceList([])
      setIsGameOver(false)
    }
    const [pokemonChoiceList, setPokemonChoiceList] = useState<Pokemon[]>([])
    const [volume, setVolume] = useState<number>(25)
    const [isGameOver, setIsGameOver]= useState<boolean>(false)
    
    
      return (
        <GameStateContext.Provider value={{pokemonChoiceList, volume, isGameOver,setVolume, setIsGameOver, addChoice, resetGame, hiddenPokemon}}>
            {children}
        </GameStateContext.Provider>
      )
}

export function useGameState(){
    const context = useContext(GameStateContext)
    if(!context){
        throw new Error("Must use useGameState in a GameStateProvider")
    }
    return context
}
