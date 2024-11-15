import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchPokemons } from '~/api/pokemons'
import { DEFAULT_POKEMON_LIMIT } from '~/constants'
import { PokemonDetails, PokemonWithDetails } from '~/types/pokemon'
import { PokeAPIPokemonResponse } from '~/types/api'

type TQueryFnData = PokeAPIPokemonResponse
type TError = Error
type TData = PokemonWithDetails[]
type TQueryKey = string[]
type TPageParam = number

export function usePaginatedPokemonsQuery() {
  const {
    data: listOfPokemons,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TQueryFnData, TError, TData, TQueryKey, TPageParam>({
    queryKey: ['pokemons-list'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchPokemons(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length * DEFAULT_POKEMON_LIMIT : undefined,
    select: data =>
      data.pages.flatMap(page =>
        page.results.map(result => {
          const id = parseInt(result.url.split('/').at(-2) || '1', 10)
          const name =
            result.name.charAt(0).toUpperCase() + result.name.slice(1)

          return {
            id,
            name,
            details: result.details as PokemonDetails,
          }
        }),
      ),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    data: listOfPokemons,
    isLoadingInitial: isPending,
    isLoadingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
  }
}
