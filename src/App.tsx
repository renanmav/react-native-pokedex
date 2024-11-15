import '../global.css'

import { useColorScheme } from 'react-native'

import { DarkTheme, LightTheme } from './constants'
import Providers from './Providers'
import Screens from './screens'

export default function App() {
  const navigationTheme = useColorScheme() === 'dark' ? DarkTheme : LightTheme

  return (
    <Providers>
      <Screens theme={navigationTheme} />
    </Providers>
  )
}
