import { DexEntry, Entry, EvolvesTo, GenerationPokemon, Pokemon } from "@/components/pokemon/types";

export const getPokemon = async(name:string):Promise<Pokemon> =>{
    const fetchData = async ():Promise<Pokemon | undefined> => {
        try{
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
            const speciesData = await speciesRes.json();

            const pokemonRes = await fetch(speciesData.varieties[0].pokemon.url);
            const pokemonData = await pokemonRes.json();
            
            const evoChainRes = fetch(speciesData.evolution_chain.url);
            const typePromises = pokemonData.types.map(async (type: {slot: number, type: { name: string, url: string }}) => {
                const res = await fetch(type.type.url);
                const data = await res.json();
                return data;
            });

            const [evoRes, typesData] = await Promise.all([
                evoChainRes,
                Promise.all(typePromises)
            ]);
            const evoData = await evoRes.json()

            const canEvolve: boolean = determineCanEvolve(speciesData.name, evoData.chain)
            const pokemon: Pokemon = {
                id: Number(speciesData.id), 
                name: speciesData.name,
                color: {
                name: speciesData.color.name
                },
                generation: {
                name : speciesData.generation.name.split("-")[1]
                },
                sprites: {
                front_default: pokemonData.sprites.front_default
                },
                types: typesData.map(type=>{
                return {name: type.name, name_icon: type.sprites['generation-ix']["scarlet-violet"].name_icon }
                }),
                weight: pokemonData.weight/10,
                canEvolve: canEvolve,
                cry  : pokemonData.cries.latest
            }
            return pokemon
        }catch(err){
            console.log(err)
        }
    }
    const result = await fetchData();
    if(result){
        return result as Pokemon
    }
    throw new Error("Pokemon doesn't exist!" + name)
}
const determineCanEvolve = (name: string, evoChain: EvolvesTo): boolean => {
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
export const getAllPokemonInGen = async(generationID: number):Promise<GenerationPokemon>=>{
    try{
        const generationRes = await fetch(`https://pokeapi.co/api/v2/generation/${generationID}/`)
        const generationData = await generationRes.json()
        return {
            id: generationData.id,
            name: generationData.main_region.name,
            pokemon_species: generationData.pokemon_species
        } as GenerationPokemon
    }catch(err){
        console.log(err)
    }
    throw new Error("Generation doesn't exist!")
}
export const getEntry = async(id:number):Promise<DexEntry> =>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        const data = await res.json()
        const entries = data.flavor_text_entries.filter((entry:Entry) =>
            entry.language.name === "en"
        )
      
        const random = Math.floor(Math.random() * entries.length);
   
        
        return {
            game: entries[random].version.name,
            entry: entries[random].flavor_text

        } as DexEntry
    }catch(err){
        console.log(err)
    }
    throw new Error("Pokemon doesn't exist!")
}