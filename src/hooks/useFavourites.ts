import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { favouritePokemonsState } from '~/store/atoms/favourites'
import { favouritePokemonsCountState } from '~/store/selectors/favourites'
import { Pokemon } from '~/types/pokemon'

export function useFavourites() {
  const [favouritePokemons, setFavouritePokemons] = useRecoilState(
    favouritePokemonsState,
  )

  const favouriteLength = useRecoilValue(favouritePokemonsCountState)

  const addFavourite = useCallback(
    (pokemon: Pokemon) => {
      setFavouritePokemons(prev => [...prev, pokemon])
    },
    [setFavouritePokemons],
  )

  const removeFavourite = useCallback(
    (pokemon: Pokemon) => {
      setFavouritePokemons(prev => prev.filter(p => p.id !== pokemon.id))
    },
    [setFavouritePokemons],
  )

  return {
    favouritePokemons,
    favouriteLength,
    addFavourite,
    removeFavourite,
  }
}
