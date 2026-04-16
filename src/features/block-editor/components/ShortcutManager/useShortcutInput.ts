import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/shared/store/hooks.ts';
import { startCapture, stopCapture } from '@/shared/store/uiSlice.ts';
import { formatShortcut } from '@/features/block-editor/services/shortcuts.ts';

export function useShortcutInput(onChange: (shortcut: string | null) => void) {
  const dispatch = useAppDispatch();
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const beginCapture = () => {
    setIsCapturing(true);
    dispatch(startCapture());
  };

  const endCapture = () => {
    setIsCapturing(false);
    dispatch(stopCapture());
  };

  useEffect(() => {
    if (!isCapturing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === 'Escape') {
        endCapture();
        return;
      }

      const formatted = formatShortcut(e);
      if (formatted) {
        onChange(formatted);
        endCapture();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      dispatch(stopCapture());
    };
  }, [isCapturing]);

  return { isCapturing, beginCapture };
}
