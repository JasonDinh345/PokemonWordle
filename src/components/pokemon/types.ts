export type PokeType = {
    name: string,
    name_icon:string
}
export type PokeSprite = {
    front_default: string
}
export type Pokemon = {

    id: number
    name: string
    weight: number
    types: PokeType[],
    sprites: PokeSprite
    color: {
        name: string
    }
    generation: {
        name: string
    }
    canEvolve: boolean
    cry: string
}

export type EvolvesTo = {
    species : {
        name: string
    },
    evolves_to : EvolvesTo[]
}
export type GenerationPokemon = {
    id : number
    name :string 
    pokemon_species : SimpleData[]
}
export type SimpleData =  {name: string, url: string}

export type DexEntry = {
    game: string
    entry: string
}
export type Entry = {
    flavor_text: string
    language: SimpleData
    version : SimpleData
}