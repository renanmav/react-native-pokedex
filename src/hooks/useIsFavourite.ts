import { useRecoilValue } from 'recoil'

import { isFavouritePokemonState } from '~/store/selectors/favourites'

export function useIsFavourite(pokemonId: number) {
  return useRecoilValue(isFavouritePokemonState(pokemonId))
}
