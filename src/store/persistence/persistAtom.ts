import { DefaultValue, AtomEffect } from 'recoil'

import { storage } from './mmkv'

export function persistAtom(key: string): AtomEffect<any> {
  return ({ setSelf, onSet }) => {
    setSelf(() => {
      const savedValue = storage.getString(key)
      if (savedValue != null) {
        return JSON.parse(savedValue)
      }
      return new DefaultValue()
    })

    onSet((newValue, _oldValue, isReset) => {
      if (isReset) {
        storage.delete(key)
      } else {
        storage.set(key, JSON.stringify(newValue))
      }
    })
  }
}
