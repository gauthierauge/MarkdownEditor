import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { useEditorInsert } from '@/shared/context/EditorInsertContext';
import { matchShortcut } from '@/features/block-editor/services/shortcuts.service';

export function useShortcutListener(): void {
  const { insertText } = useEditorInsert();
  const blocks = useAppSelector((s) => s.blocks.blocks);
  const isCapturing = useAppSelector((s) => s.ui.isCapturingShortcut);

  const isCapturingRef = useRef(isCapturing);
  useEffect(() => {
    isCapturingRef.current = isCapturing;
  }, [isCapturing]);

  const insertTextRef = useRef(insertText);
  useEffect(() => {
    insertTextRef.current = insertText;
  }, [insertText]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCapturingRef.current) return;

      for (const block of blocks) {
        if (!block.shortcut) continue;
        if (matchShortcut(e, block.shortcut)) {
          e.preventDefault();
          e.stopPropagation();
          insertTextRef.current(block.content);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blocks]);
}
