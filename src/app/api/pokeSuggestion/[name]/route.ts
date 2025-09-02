import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> }
) {
 
  const { name } = await context.params;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PokeAPI (status ${res.status})` },
        { status: res.status }
      );
    }

    const data = await res.json();
    
    const suggestion = {name: data.name, sprites: {front_default: data.sprites.front_default}}
    return NextResponse.json(suggestion); 
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Server error fetching pokemon" },
      { status: 500 }
    );
  }
}