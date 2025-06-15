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
    evolution_chain: EvolutionChain
}

export type EvolutionChain = {
    chain: EvolvesTo
}

export type EvolvesTo = {
    speicies : {
        name: string
    },
    evolves_to : EvolvesTo[] 
}
