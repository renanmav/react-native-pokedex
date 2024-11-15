import { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Canvas, Group, Path, Skia } from '@shopify/react-native-skia'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated'

import {
  Colors,
  MAX_BASE_EXPERIENCE,
  POKEMON_ITEM_IMAGE_SIZE,
} from '~/constants'

import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

const STROKE_WIDTH = 5
const RADIUS = POKEMON_ITEM_IMAGE_SIZE / 2 - 2 * STROKE_WIDTH
const BACKGROUND_OPACITY = 0.2
const FAVOURITE_ICON_SIZE = RADIUS
const FONT_SIZE = 14
const MAX_PERCENTAGE = 75 // clamp the percentage to avoid overflow with the favourite icon
const BASE_DELAY = 300
const MAX_INDEX = 3
const DELAY_PER_INDEX = 150
const PERCENTAGE_ANIMATION_DURATION = 1000

interface BaseExperienceDonutChartProps {
  index?: number
  value?: number
  maxValue?: number
  isFavourite?: boolean
  handleFavouritePress?: () => void
}

export function BaseExperienceDonutChart({
  index = 0,
  value = 0,
  maxValue = MAX_BASE_EXPERIENCE,
  isFavourite = false,
  handleFavouritePress = () => {},
}: BaseExperienceDonutChartProps) {
  return (
    <ThemedView>
      <TouchableOpacity onPress={handleFavouritePress} hitSlop={20}>
        <MaterialCommunityIcons
          name="star"
          size={FAVOURITE_ICON_SIZE}
          color={isFavourite ? Colors.favourite : Colors.donutBackground}
          style={styles.favouriteIcon}
        />
        <ThemedText style={styles.baseExperience}>
          {value}
          <ThemedText style={styles.xp}>XP</ThemedText>
        </ThemedText>
        <DonutChart percentage={value / maxValue} index={index} />
      </TouchableOpacity>
    </ThemedView>
  )
}

interface DonutChartProps {
  percentage: number
  index: number
}

export function DonutChart({ percentage, index }: DonutChartProps) {
  const center = RADIUS + STROKE_WIDTH
  const size = center * 2

  const animatedPercentage = useSharedValue(0)
  const lastItemIndex = useRef(index)

  useEffect(
    function onPercentageAndIndexChange() {
      // reset the animation if the index has changed
      // this is to avoid the animation from continuing from the last item
      // due view recycling of FlashList
      if (lastItemIndex.current !== index) {
        animatedPercentage.value = 0
        lastItemIndex.current = index
      }

      const normalizedPercentage =
        Math.min(Math.max(percentage, 0), MAX_PERCENTAGE) * MAX_PERCENTAGE

      animatedPercentage.value = withDelay(
        BASE_DELAY + Math.min(index, MAX_INDEX) * DELAY_PER_INDEX,
        withTiming(normalizedPercentage, {
          duration: PERCENTAGE_ANIMATION_DURATION,
          easing: Easing.inOut(Easing.ease),
        }),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [percentage, index],
  )

  const animatedPath = useDerivedValue(() => {
    return createArcPath(animatedPercentage.value)
  }, [])

  return (
    <Canvas style={{ width: size, height: size }}>
      <Group>
        <Path
          path={createArcPath(MAX_PERCENTAGE)}
          color={Colors.donutBackground}
          style="stroke"
          strokeWidth={STROKE_WIDTH}
          opacity={BACKGROUND_OPACITY}
          strokeCap="round"
        />
        <Path
          path={animatedPath}
          color={Colors.primary}
          style="stroke"
          strokeWidth={STROKE_WIDTH}
          strokeCap="round"
        />
      </Group>
    </Canvas>
  )
}

function createArcPath(percentage: number) {
  'worklet'
  const sweepAngle = (percentage / 100) * (Math.PI * 2)
  const counterClockwiseSweepAngle = sweepAngle * -1

  const skiaPath = Skia.Path.Make()
  skiaPath.addArc(
    {
      x: STROKE_WIDTH,
      y: STROKE_WIDTH,
      width: RADIUS * 2,
      height: RADIUS * 2,
    },
    -90,
    counterClockwiseSweepAngle * (180 / Math.PI),
  )

  return skiaPath
}

const styles = StyleSheet.create({
  favouriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  baseExperience: {
    position: 'absolute',
    top: RADIUS,
    width: (RADIUS + STROKE_WIDTH) * 2,
    fontSize: FONT_SIZE,
    lineHeight: FONT_SIZE,
    textAlign: 'center',
  },
  xp: {
    fontSize: FONT_SIZE / 2,
  },
})
