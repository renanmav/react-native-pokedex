export type PokemonDetails = {
  baseExperience: number
  sprites: {
    front: string
    back: string
  }
  order: number
  height: number
  weight: number
  types: string[]
  abilities: string[]
}

export interface Pokemon {
  id: number
  name: string
  details?: PokemonDetails
}

export type PokemonWithDetails = Required<Pokemon>
