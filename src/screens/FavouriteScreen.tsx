import { useCallback, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { StyleSheet, LayoutChangeEvent } from 'react-native'

import { Screen } from '~/components/Screen'
import { PokemonItem } from '~/components/PokemonItem'
import { ThemedView } from '~/components/ThemedView'
import { ThemedText } from '~/components/ThemedText'
import { TabBarFooter } from '~/components/TabBarFooter'
import { useFavourites } from '~/hooks/useFavourites'
import { DEFAULT_ESTIMATED_ITEM_HEIGHT } from '~/constants'

export default function FavouriteScreen() {
  const { favouritePokemons } = useFavourites()

  // have to manually set height on empty layout
  // check https://github.com/Shopify/flash-list/issues/848
  const [emptyHeight, setEmptyHeight] = useState(0)
  const tabBarHeight = useBottomTabBarHeight()
  const handleLayout = useCallback(
    function measureEmptyHeight(e: LayoutChangeEvent) {
      'worklet'
      setEmptyHeight(e.nativeEvent.layout.height - tabBarHeight)
    },
    [tabBarHeight],
  )

  return (
    <Screen>
      <FlashList
        data={favouritePokemons}
        renderItem={({ item, index }) => (
          <PokemonItem pokemon={item} index={index} />
        )}
        estimatedItemSize={DEFAULT_ESTIMATED_ITEM_HEIGHT}
        onLayout={handleLayout}
        ListEmptyComponent={<EmptyFavourites height={emptyHeight} />}
        ListFooterComponent={<TabBarFooter />}
      />
    </Screen>
  )
}

function EmptyFavourites({ height }: { height: number }) {
  return (
    <ThemedView style={[styles.emptyContainer, { height }]}>
      <ThemedText style={styles.emptyText}>hmm, no favourites 🤔</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
