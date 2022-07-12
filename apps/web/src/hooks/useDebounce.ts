import { useEffect, useState } from 'react'

const useDebounce = (value: string | number | undefined, delay: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        // Cancel the timeout if value changes (also on delay change or unmount).
        // This is how we prevent debounced value from updating if value is changed
        // within the delay period. Timeout gets cleared and restarted.
        clearTimeout(handler)
      }
    },
    // Only re-call effect if value or delay changes
    [value, delay]
  )

  return debouncedValue
}

export default useDebounce
