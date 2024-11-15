import { useCallback } from 'react'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Screen } from '~/components/Screen'
import { PokemonItem } from '~/components/PokemonItem'
import { TabBarFooter } from '~/components/TabBarFooter'
import { ThemedText } from '~/components/ThemedText'
import { ThemedView } from '~/components/ThemedView'
import { usePaginatedPokemonsQuery } from '~/hooks/usePaginatedPokemonsQuery'
import {
  Colors,
  DEFAULT_ESTIMATED_ITEM_HEIGHT,
  POKEMON_ITEM_IMAGE_SIZE,
} from '~/constants'

export default function HomeScreen() {
  const { data, isLoadingInitial, isLoadingMore, hasMore, loadMore } =
    usePaginatedPokemonsQuery()

  const handleEndReached = useCallback(() => {
    if (isLoadingInitial || isLoadingMore || !hasMore) {
      return
    }

    loadMore()
  }, [isLoadingInitial, isLoadingMore, hasMore, loadMore])

  return (
    <Screen>
      <Header length={data?.length || 0} />
      <FlashList
        data={data}
        renderItem={({ item, index }) => (
          <PokemonItem pokemon={item} index={index} />
        )}
        estimatedItemSize={DEFAULT_ESTIMATED_ITEM_HEIGHT}
        onEndReached={handleEndReached}
        ListFooterComponent={
          <TabBarFooter loading={isLoadingInitial || isLoadingMore} />
        }
      />
    </Screen>
  )
}

function Header({ length }: { length: number }) {
  return (
    <ThemedView
      className="w-full px-6 py-4 border-b-hairline flex-row gap-4 border-b-[#CCCCCC]"
      style={{ borderColor: Colors.donutBackground }}>
      <MaterialCommunityIcons
        name="pokeball"
        size={POKEMON_ITEM_IMAGE_SIZE}
        color={Colors.primary}
      />
      <ThemedView className="flex-1 justify-center">
        <ThemedText className="text-2xl font-bold">RNPokedex</ThemedText>
        <ThemedText className="text-base">
          Current list size: {length}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  )
}
