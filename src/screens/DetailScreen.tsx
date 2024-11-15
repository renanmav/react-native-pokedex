import { ScrollView } from 'react-native'
import type { StaticScreenProps } from '@react-navigation/native'

import { Screen } from '~/components/Screen'
import { ThemedView } from '~/components/ThemedView'
import { AnimatedPokemonSprite } from '~/components/AnimatedPokemonSprite'
import { DetailItem } from '~/components/DetailItem'
import { PokemonWithDetails } from '~/types/pokemon'

type Props = StaticScreenProps<{
  pokemon: PokemonWithDetails
}>

export default function DetailScreen({ route }: Props) {
  const { pokemon } = route.params

  return (
    <Screen>
      <ScrollView className="flex-1">
        <ThemedView className="justify-center items-center p-8">
          <AnimatedPokemonSprite sprites={pokemon.details.sprites} />
          <ThemedView className="w-full gap-4">
            <DetailItem label="Order" value={`#${pokemon.details.order}`} />
            <DetailItem
              label="Base experience"
              value={`${pokemon.details.baseExperience}xp`}
            />
            <DetailItem
              label="Height"
              value={`${(pokemon.details.height / 10).toFixed(1)}m`}
            />
            <DetailItem
              label="Weight"
              value={`${(pokemon.details.weight / 10).toFixed(1)}kg`}
            />
            <DetailItem
              label="Types"
              value={pokemon.details.types.join(', ')}
            />
            <DetailItem
              label="Abilities"
              value={pokemon.details.abilities.join(', ')}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </Screen>
  )
}
