import { DexEntry, Entry } from "@/components/pokemon/types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { entryID: number } }
) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.entryID}/`)

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from PokeAPI (status ${res.status})` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const entries = data.flavor_text_entries.filter((entry:Entry) =>
                entry.language.name === "en")
    const random = Math.floor(Math.random() * entries.length);
    return {
        game: entries[random].version.name,
        entry: entries[random].flavor_text
    } as DexEntry
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Server error fetching pokemon entry" },
      { status: 500 }
    );
  }
}