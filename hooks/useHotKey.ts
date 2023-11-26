import { useEffect } from 'react'

type Key = 'ctrl' | 'shift' | 'alt' | 'escape' | string

export const useHotKey = (keys: Key[], callback: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        keys.every(
          (key) =>
            (key === 'ctrl' && event.ctrlKey) ||
            (key === 'shift' && event.shiftKey) ||
            (key === 'alt' && event.altKey) ||
            (key === 'escape' && event.altKey) ||
            (typeof key === 'string' && event.key.toLocaleLowerCase() === key),
        )
      ) {
        event.preventDefault()
        callback()
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [keys, callback])
}
