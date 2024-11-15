import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { StaticParamList } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from './HomeScreen'
import FavouritesScreen from './FavouriteScreen'

// Static API
const Tabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'All',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="pokeball" size={size} color={color} />
        ),
      },
    },
    Favourites: {
      screen: FavouritesScreen,
      options: {
        title: 'Favourites',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="star" size={size} color={color} />
        ),
      },
    },
  },
})

export type TabsParamList = StaticParamList<typeof Tabs>

export default Tabs
