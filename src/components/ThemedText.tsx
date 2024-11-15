import { useMemo } from 'react'
import { Text, TextProps, useColorScheme } from 'react-native'

import { Colors } from '~/constants'

interface ThemedTextProps extends TextProps {
  children: React.ReactNode
}

export function ThemedText({ children, style, ...props }: ThemedTextProps) {
  const isDarkMode = useColorScheme() === 'dark'

  const textStyle = useMemo(
    () => ({
      color: isDarkMode ? Colors.foregroundLight : Colors.foregroundDark,
    }),
    [isDarkMode],
  )

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  )
}
