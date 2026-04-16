import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setContent, setCursorPosition } from '@/store/editorSlice.ts';
import type React from 'react';

export function useMainEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((s) => s.editor.content);
  const cursorPosition = useAppSelector((s) => s.editor.cursorPosition);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlers = {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setContent(e.target.value)),

    onSelect: (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(setCursorPosition(e.currentTarget.selectionStart)),

    onClick: (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(setCursorPosition(e.currentTarget.selectionStart)),

    onKeyUp: (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      dispatch(setCursorPosition(e.currentTarget.selectionStart)),
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
