import { useMemo } from 'react'
import { View, ViewProps, useColorScheme } from 'react-native'

import { Colors } from '~/constants'

interface ThemedViewProps extends ViewProps {
  children?: React.ReactNode
}

export function ThemedView({ children, style, ...props }: ThemedViewProps) {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode
        ? Colors.foregroundDark
        : Colors.foregroundLight,
    }),
    [isDarkMode],
  )

  return (
    <View style={[backgroundStyle, style]} {...props}>
      {children}
    </View>
  )
}
