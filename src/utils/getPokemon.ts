import { DexEntry, EvolvesTo, GenerationPokemon, Pokemon, PokeSuggestionType } from "@/components/pokemon/types";

export const getPokemon = async(name:string):Promise<Pokemon> =>{
    const res = await fetch(`/api/pokemon/${name}`);
    if (!res.ok) {
        throw new Error(`Failed to load Pokemon: ${name}`);
    }
    const data = await res.json();
    return data as Pokemon;
}
export const determineCanEvolve = (name: string, evoChain: EvolvesTo): boolean => {
  if (evoChain.species.name === name) {
    return evoChain.evolves_to.length > 0;
  }

  for (const evo of evoChain.evolves_to) {
    if (determineCanEvolve(name, evo)) {
      return true;
    }
  }

  return false;
};
export const getAllPokemonInGen = async (generationID: number): Promise<GenerationPokemon> => {
    const res = await fetch(`/api/generation/${generationID}`);
    if (!res.ok) {
        throw new Error(`Failed to load gen ${generationID}`);
    }
    const data = await res.json();
    return data as GenerationPokemon;
};

export const getEntry = async(id:number):Promise<DexEntry> =>{
    const res = await fetch(`/api/entry/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to load entry of ID: ${id}`);
    }
    const data = await res.json();
    return data as DexEntry;
}
export const getPokemonSuggestion = async(name:string):Promise<PokeSuggestionType> =>{
  const res = await fetch(`/api/pokeSuggestion/${name}`);
  if (!res.ok) {
        throw new Error(`Failed to load Pokemon: ${name}`);
    }
    const data = await res.json();
    return data as PokeSuggestionType;
}