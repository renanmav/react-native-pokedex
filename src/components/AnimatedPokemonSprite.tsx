import { useState } from 'react'
import { StyleProp, ImageStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withDelay,
  interpolate,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated'

import { PokemonDetails } from '~/types/pokemon'

const SPRITE_SIZE = 300

type Sprites = PokemonDetails['sprites']

const SpriteKeys = ['front', 'back'] as (keyof Sprites)[]

type Props = {
  sprites: Sprites
  style?: StyleProp<ImageStyle>
}

export function AnimatedPokemonSprite({ sprites, style }: Props) {
  const { spriteUri, animatedStyle } = useAnimateSprite(sprites)

  return (
    <Animated.Image
      source={{ uri: spriteUri }}
      width={SPRITE_SIZE}
      height={SPRITE_SIZE}
      style={[animatedStyle, style]}
    />
  )
}

const BREATHING_DURATION = 2000
const BREATHING_EASING = Easing.bezier(0.25, 0.1, 0.25, 1)

const FLIP_DELAY = BREATHING_DURATION * 2
const FLIP_DURATION = 100

function useAnimateSprite(sprites: Sprites) {
  const opacity = useSharedValue(1)
  const rotation = useSharedValue(0)
  const breathing = useSharedValue(0)
  const [spriteUri, setSprite] = useState(sprites[SpriteKeys[0]] as string)
  const hasAnotherSprite = Object.keys(sprites).length > 1

  const switchSprite = () => {
    const newSprite =
      spriteUri === sprites[SpriteKeys[0]]
        ? (sprites[SpriteKeys[1]] as string)
        : (sprites[SpriteKeys[0]] as string)
    setSprite(newSprite)
  }

  // Continuous breathing animation
  breathing.value = withRepeat(
    withSequence(
      withTiming(1, {
        duration: BREATHING_DURATION,
        easing: BREATHING_EASING,
      }),
      withTiming(0, {
        duration: BREATHING_DURATION,
        easing: BREATHING_EASING,
      }),
    ),
    -1,
    true,
  )

  // Flip animation
  rotation.value = withRepeat(
    withSequence(
      withDelay(
        FLIP_DELAY,
        withTiming(0, { duration: FLIP_DURATION }, finished => {
          if (finished && hasAnotherSprite) {
            runOnJS(switchSprite)()
          }
        }),
      ),
      withDelay(FLIP_DELAY, withTiming(1, { duration: FLIP_DURATION })),
    ),
    -1,
    false,
  )

  const animatedStyle = useAnimatedStyle(() => ({
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
    opacity: opacity.value,
    transform: [
      {
        rotateY: `${interpolate(rotation.value, [0, 1], [0, -180])}deg`,
      },
      {
        translateY: interpolate(breathing.value, [0, 1], [0, -3]),
      },
      {
        scale: interpolate(breathing.value, [0, 1], [1, 1.05]),
      },
    ],
  }))

  return { spriteUri, animatedStyle }
}
