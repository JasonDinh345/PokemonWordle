import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ gen: string }> }
) {
 
  const { gen } = await context.params;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/generation/${gen}/`, {
      cache: "no-store", 
    });
    if (!res.ok) {
        
      return NextResponse.json(
        { error: `Failed to fetch from PokeAPI (status ${res.status})` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      id: data.id,
      name: data.main_region.name,
      pokemon_species: data.pokemon_species,
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Server error fetching generation" },
      { status: 500 }
    );
  }
}