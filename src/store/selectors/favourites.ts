import { createCachedSelector } from '../persistence/cache'
import { favouritePokemonsState } from '../atoms/favourites'

export const favouritePokemonsCountState = createCachedSelector({
  key: 'favouritePokemonsCount',
  get: ({ get }) => {
    const favourites = get(favouritePokemonsState)
    return favourites.length
  },
})

export const isFavouritePokemonState = (pokemonId: number) =>
  createCachedSelector({
    key: `isFavouritePokemon${pokemonId}`,
    get: ({ get }) => {
      const favourites = get(favouritePokemonsState)
      return favourites.some(pokemon => pokemon.id === pokemonId)
    },
  })
