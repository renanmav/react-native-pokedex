import { Theme } from '@react-navigation/native'
// @ts-expect-error not typed
import { fonts } from '@react-navigation/native/src/theming/fonts'

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'
export const MAX_BASE_EXPERIENCE = 563 // Eternatus-eternamax
export const DEFAULT_ESTIMATED_ITEM_HEIGHT = 80
export const DEFAULT_POKEMON_LIMIT = 20
export const POKEMON_ITEM_IMAGE_SIZE = 70

export const Colors = {
  primary: 'rgb(10, 132, 255)',
  secondary: 'rgb(255, 59, 48)',
  foregroundLight: 'rgb(242, 242, 242)',
  foregroundDark: 'rgb(28, 28, 30)',
  donutBackground: 'rgb(216, 216, 216)',
  favourite: '#FFD700',
}

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: Colors.foregroundLight,
    card: Colors.foregroundLight,
    text: Colors.foregroundDark,
    border: Colors.donutBackground,
    notification: Colors.secondary,
  },
  fonts,
}

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.primary,
    background: Colors.foregroundDark,
    card: Colors.foregroundDark,
    text: Colors.foregroundLight,
    border: Colors.donutBackground,
    notification: Colors.secondary,
  },
  fonts,
}
