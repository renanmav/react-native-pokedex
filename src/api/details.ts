import { POKEAPI_BASE_URL } from '~/constants'
import { PokeAPIPokemonDetailsResponse } from '~/types/api'
import { PokemonDetails } from '~/types/pokemon'

import { ApiError } from './error'

export async function fetchPokemonDetails(id: number): Promise<PokemonDetails> {
  const url = `${POKEAPI_BASE_URL}/pokemon/${id}`

  const response = await fetch(url)

  if (!response.ok || response.status !== 200) {
    throw new ApiError('Failed to fetch pokemon details', url, response.status)
  }

  const data: PokeAPIPokemonDetailsResponse = await response.json()

  return transformPokemonDetails(data)
}

/**
 * Transform the raw API response into a more convenient type.
 *
 * Doing this because we don't need all the data from the API response.
 */
function transformPokemonDetails(
  details: PokeAPIPokemonDetailsResponse,
): PokemonDetails {
  return {
    baseExperience: details.base_experience,
    sprites: {
      front: details.sprites.front_default,
      back: details.sprites.back_default,
    },
    order: details.order,
    height: details.height,
    weight: details.weight,
    types: details.types.map(type => type.type.name),
    abilities: details.abilities.map(ability => ability.ability.name),
  }
}
