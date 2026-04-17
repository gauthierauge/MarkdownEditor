import { useCallback, useEffect, useState } from 'react'
import { formatShortcut } from '@/features/block-editor/services/shortcuts.service'
import { useAppDispatch } from '@/shared/store/hooks'
import { startCapture, stopCapture } from '@/shared/store/slices/uiSlice'

export function useShortcutInput(onChange: (shortcut: string | null) => void) {
  const dispatch = useAppDispatch()
  const [isCapturing, setIsCapturing] = useState(false)

  const beginCapture = () => {
    setIsCapturing(true)
    dispatch(startCapture())
  }

  const endCapture = useCallback(() => {
    setIsCapturing(false)
    dispatch(stopCapture())
  }, [dispatch])

  useEffect(() => {
    if (!isCapturing) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (event.key === 'Escape') {
        endCapture()
        return
      }

      const formatted = formatShortcut(event)

      if (formatted) {
        onChange(formatted)
        endCapture()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      dispatch(stopCapture())
    }
  }, [dispatch, endCapture, isCapturing, onChange])

  return { beginCapture, isCapturing }
}
