import { Pokemon } from "@/components/pokemon/types";
import { romanToInt } from "./romanToInt";
export type PokemonComparison = {
    id: Comparison
    name: Comparison
    weight: Comparison
    types: Comparison[],
    color: Comparison
    generation: Comparison
    canEvolve: Comparison
}
type Comparison = {
    isEqual: boolean
    direction? : "less" |  "greater"
}
export const comparePokemon = (
    chosenPokemon: Pokemon,
    hiddenPokemon: Pokemon
  
): PokemonComparison => {
  const compareNumber = (a: number, b: number): Comparison => ({
    isEqual: a === b,
    direction: a === b ? undefined : a > b ? "greater" : "less",
  });

   const compareString = (
    chosenType: string,
    hiddenType1: string,
    hiddenType2?: string
  ): Comparison => {
    const chosenTypeLower = chosenType.toLowerCase();
    const hiddenType1Lower = hiddenType1.toLowerCase();
    const hiddenType2Lower = hiddenType2?.toLowerCase();
    return {
      isEqual: chosenTypeLower === hiddenType1Lower || chosenTypeLower === hiddenType2Lower,
    };
  };

  const chosenPokemonType2:string = chosenPokemon.types[1]?.name || ""
  const hiddenPokemonType2: string = hiddenPokemon.types[1]?.name || ""
  

  return {
    id: compareNumber(chosenPokemon.id, hiddenPokemon.id),
    name: compareString(chosenPokemon.name, hiddenPokemon.name),
    weight: compareNumber(chosenPokemon.weight, hiddenPokemon.weight),
    types: [
      compareString(chosenPokemon.types[0]?.name, hiddenPokemon.types[0]?.name, hiddenPokemonType2) ,
      compareString(chosenPokemonType2, hiddenPokemonType2, hiddenPokemon.types[0]?.name)
    ],
    color: compareString(chosenPokemon.color.name, hiddenPokemon.color.name),
    generation: compareNumber(romanToInt(chosenPokemon.generation.name), romanToInt(hiddenPokemon.generation.name)),
    canEvolve: {
      isEqual: chosenPokemon.canEvolve === hiddenPokemon.canEvolve
    },
  };
};
