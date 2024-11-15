import { ReadWriteSelectorOptions, selector } from 'recoil'

// Create a key object structure
interface SelectorKey {
  id: string
}

// Map to store the key objects as WeakMap uses objects as keys
const keyMap = new Map<string, SelectorKey>()

// WeakMap will allow garbage collection of unused selectors
const selectorCache = new WeakMap<SelectorKey, ReturnType<typeof selector>>()

type GetFn<T> = ReadWriteSelectorOptions<T>['get']

interface CreateCachedSelectorOptions<T> {
  key: string
  get: GetFn<T>
}

type ReturnTypeSelector<T> = ReturnType<typeof selector<T>>

export function createCachedSelector<T>(
  options: CreateCachedSelectorOptions<T>,
): ReturnTypeSelector<T> {
  // Get or create the key object
  let keyObj = keyMap.get(options.key)
  if (!keyObj) {
    keyObj = { id: options.key }
    keyMap.set(options.key, keyObj)
  }

  // Check cache
  const existing = selectorCache.get(keyObj)
  if (existing) {
    return existing as ReturnTypeSelector<T>
  }

  const newSelector = selector({
    key: options.key,
    get: options.get,
  })

  selectorCache.set(keyObj, newSelector)
  return newSelector
}
