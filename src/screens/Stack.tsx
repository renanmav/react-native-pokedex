import { createStackNavigator } from '@react-navigation/stack'
import { StaticParamList } from '@react-navigation/native'

import Tabs from './Tabs'
import DetailScreen from './DetailScreen'

// Static API
const Stack = createStackNavigator({
  initialRouteName: 'Main',
  screens: {
    Main: {
      screen: Tabs,
      options: {
        headerShown: false,
      },
    },
    Detail: {
      screen: DetailScreen,
      options: ({ route }) => ({
        headerBackTitle: '',
        // lol, react-navigation is typing route.params as object here
        // @ts-expect-error Property 'pokemon' does not exist on type 'object'
        title: route.params?.pokemon.name || 'Details',
      }),
    },
  },
})

// Static API param list
// Check: https://reactnavigation.org/docs/typescript
export type StackParamList = StaticParamList<typeof Stack>

export default Stack

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
