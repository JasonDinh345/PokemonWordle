import { EvolvesTo, GenerationPokemon, Pokemon } from "@/components/pokemon/types";

export const getPokemon = async(name:string):Promise<Pokemon> =>{
    const fetchData = async ():Promise<Pokemon | undefined> => {
        try{
            const [res1, res2] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`),
                fetch((`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`))
            ])
            const data1 = await res1.json();
            const data2 = await res2.json();
            
            const evoChainRes = fetch(data1.evolution_chain.url);
            const typePromises = data2.types.map(async (type: {slot: number, type: { name: string, url: string }}) => {
                const res = await fetch(type.type.url);
                const data = await res.json();
                return data;
            });

            const [evoRes, typesData] = await Promise.all([
                evoChainRes,
                Promise.all(typePromises)
            ]);
            const evoData = await evoRes.json()

            const canEvolve: boolean = determineCanEvolve(data1.name, evoData.chain)
            const pokemonData: Pokemon = {
                id: Number(data1.id), 
                name: data1.name,
                color: {
                name: data1.color.name
                },
                generation: {
                name : data1.generation.name.split("-")[1]
                },
                sprites: {
                front_default: data2.sprites.front_default
                },
                types: typesData.map(type=>{
                return {name: type.name, name_icon: type.sprites['generation-ix']["scarlet-violet"].name_icon }
                }),
                weight: data2.weight/10,
                canEvolve: canEvolve
            }
            return pokemonData
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
const determineCanEvolve = (name: string, evoChain: EvolvesTo)=>{

    if(evoChain.species.name === name){
        return evoChain.evolves_to.length !== 0
    }
   
    return determineCanEvolve(name, evoChain.evolves_to[0])
}
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