import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks.ts';
import { insertAtCursor } from '@/shared/store/editorSlice.ts';
import { matchShortcut } from '@/features/block-editor/services/shortcuts.ts';

export function useShortcutListener(): void {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((s) => s.blocks.blocks);
  const isCapturing = useAppSelector((s) => s.ui.isCapturingShortcut);

  const isCapturingRef = useRef(isCapturing);
  useEffect(() => {
    isCapturingRef.current = isCapturing;
  }, [isCapturing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCapturingRef.current) return;

      for (const block of blocks) {
        if (!block.shortcut) continue;
        if (matchShortcut(e, block.shortcut)) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(insertAtCursor(block.content));
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blocks, dispatch]);
}
