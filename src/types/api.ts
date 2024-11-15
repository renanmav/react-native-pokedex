export interface PokeAPIPokemonResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
    details?: unknown
  }[]
}

export interface PokeAPIPokemonDetailsResponse {
  /**
   * in XP
   */
  base_experience: number
  /**
   * in decimetres
   */
  height: number
  /**
   * in hectograms
   */
  weight: number
  order: number
  sprites: Sprites
  abilities: Ability[]
  forms: Form[]
  types: Type[]
  moves: Move[]
}

export interface Sprites {
  back_default: string
  back_female: string | null
  back_shiny: string
  back_shiny_female: string | null
  front_default: string
  front_female: string | null
  front_shiny: string
  front_shiny_female: string | null
}

export interface Ability {
  is_hidden: boolean
  slot: number
  ability: {
    name: string
    url: string
  }
}

export interface Form {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface Move {
  move: {
    name: string
    url: string
  }
}
