import { POKEAPI_BASE_URL, DEFAULT_POKEMON_LIMIT } from '~/constants'
import { PokeAPIPokemonResponse } from '~/types/api'

import { fetchPokemonDetails } from './details'
import { ApiError } from './error'

export async function fetchPokemons(
  offset: number,
): Promise<PokeAPIPokemonResponse> {
  const url = `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${DEFAULT_POKEMON_LIMIT}`

  const response = await fetch(url)

  if (!response.ok || response.status !== 200) {
    throw new ApiError('Failed to fetch pokemons', url, response.status)
  }

  const data: PokeAPIPokemonResponse = await response.json()

  const results = data.results.map(result => ({
    id: parseInt(result.url.split('/').at(-2) || '1', 10),
    name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
  }))

  const settledDetails = await Promise.allSettled(
    results.map(result => fetchPokemonDetails(result.id)),
  )

  for (const result of settledDetails) {
    if (result.status === 'fulfilled') {
      const index = settledDetails.indexOf(result)
      data.results[index].details = result.value
    } else {
      console.warn('detail not fulfilled', JSON.stringify(result))
    }
  }

  return data
}
