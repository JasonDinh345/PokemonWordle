import { Pokemon } from "@/components/pokemon/types";
import { determineCanEvolve } from "@/utils/getPokemon";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> }
) {
 
  const { name } = await context.params;
  try {
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);

    if (!speciesRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PokeAPI (status ${speciesRes.status})` },
        { status: speciesRes.status }
      );
    }

    const speciesData = await speciesRes.json();

    const pokemonRes = await fetch(speciesData.varieties[0].pokemon.url);
    if (!pokemonRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PokeAPI (status ${pokemonRes.status})` },
        { status: pokemonRes.status }
      );
    }
    const pokemonData = await pokemonRes.json();
    const evoChainRes = await fetch(speciesData.evolution_chain.url);
    if (!evoChainRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PokeAPI (status ${evoChainRes.status})` },
        { status: evoChainRes.status }
      );
    }
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
    return NextResponse.json(pokemon); 
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Server error fetching pokemon entry" },
      { status: 500 }
    );
  }
}