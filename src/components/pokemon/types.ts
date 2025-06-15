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
}



export type EvolvesTo = {
    species : {
        name: string
    },
    evolves_to : EvolvesTo[]
}
