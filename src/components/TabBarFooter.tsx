import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ActivityIndicator } from 'react-native'

import { ThemedView } from './ThemedView'

type Props = {
  loading?: boolean
}

export function TabBarFooter({ loading }: Props) {
  const tabBarHeight = useBottomTabBarHeight()

  return (
    <>
      {loading ? <ActivityIndicator className="flex-1 my-4" /> : null}
      <ThemedView style={{ height: tabBarHeight }} />
    </>
  )
}
