import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  selectCurrentContent,
  selectCurrentCursorPosition,
  setContent,
  setSelection,
} from '@/store/editorSlice.ts';
import type React from 'react';

export function useMainEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectCurrentContent);
  const cursorPosition = useAppSelector(selectCurrentCursorPosition);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlers = {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setContent(e.target.value)),

    onSelect: (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(
        setSelection({
          selectionEnd: e.currentTarget.selectionEnd,
          selectionStart: e.currentTarget.selectionStart,
        }),
      ),

    onClick: (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(
        setSelection({
          selectionEnd: e.currentTarget.selectionEnd,
          selectionStart: e.currentTarget.selectionStart,
        }),
      ),

    onKeyUp: (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(
        setSelection({
          selectionEnd: e.currentTarget.selectionEnd,
          selectionStart: e.currentTarget.selectionStart,
        }),
      ),
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (ta.selectionStart === cursorPosition) return;
    ta.setSelectionRange(cursorPosition, cursorPosition);
    ta.focus();
  }, [cursorPosition]);

  return { textareaRef, content, handlers };
}
