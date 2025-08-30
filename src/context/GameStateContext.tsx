"use client"
import { Pokemon } from "@/components/pokemon/types";
import { getPokemon } from "@/utils/getPokemon";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAllPokemon } from "./AllPokemonContext";

type GameStateContextProps = {
    pokemonChoiceList: Pokemon[]
    volume: number
    hiddenPokemon: Pokemon | null
    isLoading: boolean
    setVolume: (number: number)=>  void
    isGameOver: boolean
    setIsGameOver: (isGameOver: boolean)=> void
    addChoice: (name: string)=>void
    resetGame: ()=> void
}
const GameStateContext = createContext<GameStateContextProps| undefined>(undefined)

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [hiddenPokemon, setHiddenPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonChoiceList, setPokemonChoiceList] = useState<Pokemon[]>([])
  const [volume, setVolume] = useState<number>(25)
  const [isGameOver, setIsGameOver]= useState<boolean>(false)    
  const {getRandomPokemon, pokemonList} = useAllPokemon();

   useEffect(() => {
   
     if (pokemonList.length > 0 && isGameOver === false) {
       (async () => {
         const pokemon = await getRandomPokemon();
         setHiddenPokemon(pokemon);
       })();
     }
   }, [pokemonList, getRandomPokemon, isGameOver]);
    const addChoice = async(name:string)=>{
        setIsLoading(true)      
        const result = await getPokemon(name);
        if(result){
          const newChoice = result as Pokemon
          const updatedList:Pokemon[] = [...pokemonChoiceList, newChoice]
          setPokemonChoiceList(updatedList)
        }
        setIsLoading(false)          
      }
    const resetGame = async() =>{
      setPokemonChoiceList([])
      setIsGameOver(false)
    }
    
    
    
      return (
        <GameStateContext.Provider value={{pokemonChoiceList, volume, isGameOver,setVolume, setIsGameOver, addChoice, resetGame, hiddenPokemon, isLoading}}>
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
