import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type Props = {
  label: string
  value: string
}

export function DetailItem({ label, value }: Props) {
  return (
    <ThemedView className="flex-row justify-between rounded-md border-hairline p-4 border-gray-400">
      <ThemedText className="font-bold">{label}</ThemedText>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  )
}
