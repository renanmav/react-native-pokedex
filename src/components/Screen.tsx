import { useMemo } from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'

import { Colors } from '~/constants'

type ScreenProps = {
  children: React.ReactNode
}

export function Screen({ children }: ScreenProps) {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode
        ? Colors.foregroundDark
        : Colors.foregroundLight,
      flex: 1,
    }),
    [isDarkMode],
  )

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {children}
    </SafeAreaView>
  )
}
