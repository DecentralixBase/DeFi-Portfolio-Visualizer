import { useEffect, useCallback } from 'react'

export type KeyHandler = (e: KeyboardEvent) => void
export type KeyMap = { [key: string]: KeyHandler }

export function useKeyboardShortcut(keyMap: KeyMap) {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const handler = keyMap[e.key.toLowerCase()]
    if (handler && !e.repeat && !e.metaKey && !e.ctrlKey) {
      e.preventDefault()
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