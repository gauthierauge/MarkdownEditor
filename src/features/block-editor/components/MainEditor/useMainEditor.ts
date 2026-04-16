import { useEffect, useRef } from 'react'
import type React from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import {
  selectCurrentContent,
  selectCurrentCursorPosition,
  setContent,
  setSelection,
} from '@/shared/store/editorSlice'

export function useMainEditor() {
  const dispatch = useAppDispatch()
  const content = useAppSelector(selectCurrentContent)
  const cursorPosition = useAppSelector(selectCurrentCursorPosition)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handlers = {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setContent(event.target.value)),

    onSelect: (event: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(
        setSelection({
          selectionEnd: event.currentTarget.selectionEnd,
          selectionStart: event.currentTarget.selectionStart,
        }),
      ),

    onClick: (event: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(
        setSelection({
          selectionEnd: event.currentTarget.selectionEnd,
          selectionStart: event.currentTarget.selectionStart,
        }),
      ),

    onKeyUp: (event: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(
        setSelection({
          selectionEnd: event.currentTarget.selectionEnd,
          selectionStart: event.currentTarget.selectionStart,
        }),
      ),
  }

  useEffect(() => {
    const textarea = textareaRef.current

    if (!textarea || textarea.selectionStart === cursorPosition) {
      return
    }

    textarea.setSelectionRange(cursorPosition, cursorPosition)
    textarea.focus()
  }, [cursorPosition])

  return { textareaRef, content, handlers }
}
