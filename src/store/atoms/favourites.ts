import { atom } from 'recoil'

import { Pokemon } from '~/types'

import { persistAtom } from '../persistence/persistAtom'

const STATE_KEY = 'favouritePokemonsState'
const PERSISTENCE_KEY = 'favourite_pokemons'

export const favouritePokemonsState = atom<Pokemon[]>({
  key: STATE_KEY,
  effects: [persistAtom(PERSISTENCE_KEY)],
  default: [],
})
