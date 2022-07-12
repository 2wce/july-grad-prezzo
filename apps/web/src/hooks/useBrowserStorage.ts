/* eslint-disable */
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

const isClient = typeof window === 'object'

type parserOptions<T> =
  | {
      raw: true
    }
  | {
      raw: false
      serializer: (value: T) => string
      deserializer: (value: string) => T
    }

const noop = () => {}

const useBrowserStorage = <T>(
  key: string,
  type: 'local' | 'session',
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isClient) {
    return [initialValue as T, noop, noop]
  }
  if (!key) {
    throw new Error('useBrowserStorage key may not be falsy')
  }

  const storage = type === 'local' ? localStorage : sessionStorage

  const deserializer = options
    ? options.raw
      ? (value: any) => value
      : options.deserializer
    : JSON.parse

  const [state, setState] = useState<T | undefined>(() => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify

      const storageValue = storage.getItem(key)
      if (storageValue !== null) {
        return deserializer(storageValue)
      } else {
        initialValue && storage.setItem(key, serializer(initialValue))
        return initialValue
      }
    } catch {
      // If user is in private mode or has storage restriction
      // storage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue
    }
  })

  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        const newState =
          typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc
        if (typeof newState === 'undefined') return
        let value: string

        if (options)
          if (options.raw)
            if (typeof newState === 'string') value = newState
            else value = JSON.stringify(newState)
          else if (options.serializer) value = options.serializer(newState)
          else value = JSON.stringify(newState)
        else value = JSON.stringify(newState)

        storage.setItem(key, value)
        setState(deserializer(value))
      } catch {
        // If user is in private mode or has storage restriction
        // storage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState]
  )

  const remove = useCallback(() => {
    try {
      storage.removeItem(key)
      setState(undefined)
    } catch {
      // If user is in private mode or has storage restriction
      // storage can throw.
    }
  }, [key, setState])

  return [state, set, remove]
}

export default useBrowserStorage
