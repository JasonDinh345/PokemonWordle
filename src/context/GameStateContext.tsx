"use client"
import { Pokemon } from "@/components/pokemon/types";
import { getPokemon } from "@/utils/getPokemon";

import { createContext, ReactNode, useState } from "react";

type GameStateContextProps = {
    pokemonChoiceList: Pokemon[]
    volume: number
    setVolume: (number: number)=>  void
    isGameOver: boolean
    setIsGameOver: (isGameOver: boolean)=> void
    addChoice: (name: string)=>void
    resetChoices: ()=> void
}
const GameStateContext = createContext<GameStateContextProps| undefined>(undefined)

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
   
    const addChoice = async(name:string)=>{
              
        const result = await getPokemon(name);
        if(result){
          const newChoice = result as Pokemon
          const updatedList:Pokemon[] = [...pokemonChoiceList, newChoice]
          setPokemonChoiceList(updatedList)
        }
              
      }
    const resetChoices = () =>{
        setPokemonChoiceList([])
    }
    const [pokemonChoiceList, setPokemonChoiceList] = useState<Pokemon[]>([])
    const [volume, setVolume] = useState<number>(25)
    const [isGameOver, setIsGameOver]= useState<boolean>(false)
    
    
      return (
        <GameStateContext.Provider value={{pokemonChoiceList, volume, isGameOver,setVolume, setIsGameOver, addChoice, resetChoices}}>
            {children}
        </GameStateContext.Provider>
      )
}
