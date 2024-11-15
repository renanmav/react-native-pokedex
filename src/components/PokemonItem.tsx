import { useCallback } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ThemedText } from '~/components/ThemedText'
import { ThemedView } from '~/components/ThemedView'
import { useFavourites } from '~/hooks/useFavourites'
import { useIsFavourite } from '~/hooks/useIsFavourite'
import { Pokemon, PokemonWithDetails } from '~/types/pokemon'
import { POKEMON_ITEM_IMAGE_SIZE } from '~/constants'

import { BaseExperienceDonutChart } from './BaseExperienceDonutChart'

type Props = {
  pokemon: Pokemon
  index: number
}

export function PokemonItem({ pokemon, index }: Props) {
  const navigation = useNavigation()

  const { addFavourite, removeFavourite } = useFavourites()
  const isFavourite = useIsFavourite(pokemon.id)

  const handleFavouritePress = useCallback(() => {
    if (isFavourite) {
      return removeFavourite(pokemon)
    }

    return addFavourite(pokemon)
  }, [isFavourite, pokemon, removeFavourite, addFavourite])

  const handleItemPress = useCallback(() => {
    if (!pokemon.details) return

    navigation.navigate('Detail', {
      pokemon: pokemon as PokemonWithDetails,
    })
  }, [navigation, pokemon])

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <ThemedView className="flex-1 flex-row items-center justify-between px-6 py-2">
        <ThemedView className="flex-row items-center gap-4">
          <Image
            source={{ uri: pokemon.details?.sprites.front }}
            width={POKEMON_ITEM_IMAGE_SIZE}
            height={POKEMON_ITEM_IMAGE_SIZE}
          />
          <ThemedText className="text-lg font-bold">{pokemon.name}</ThemedText>
        </ThemedView>

        {pokemon.details?.baseExperience && (
          <BaseExperienceDonutChart
            index={index}
            value={pokemon.details?.baseExperience}
            isFavourite={isFavourite}
            handleFavouritePress={handleFavouritePress}
          />
        )}
      </ThemedView>
    </TouchableOpacity>
  )
}
