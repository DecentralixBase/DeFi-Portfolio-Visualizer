import { useEffect, useCallback } from 'react'

type KeyHandler = (e: KeyboardEvent) => void
type KeyMap = { [key: string]: KeyHandler }

export function useKeyboardShortcut(keyMap: KeyMap) {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const handler = keyMap[e.key.toLowerCase()]
    if (handler) {
      handler(e)
    }
  }, [keyMap])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
}

// Example usage:
// const keyMap = {
//   'b': () => setIsBatMode(true),
//   'escape': () => setIsBatMode(false),
// }
// useKeyboardShortcut(keyMap) 