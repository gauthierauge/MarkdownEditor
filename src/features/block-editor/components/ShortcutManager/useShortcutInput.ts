import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { startCapture, stopCapture } from '@/shared/store/slices/uiSlice';
import { formatShortcut } from '@/features/block-editor/services/shortcuts.service';

export function useShortcutInput(onChange: (shortcut: string | null) => void) {
  const dispatch = useAppDispatch();
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const beginCapture = () => setIsCapturing(true);

  useEffect(() => {
    if (isCapturing) dispatch(startCapture());
    return () => { dispatch(stopCapture()); };
  }, [dispatch, isCapturing]);

  useEffect(() => {
    if (!isCapturing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === 'Escape') {
        setIsCapturing(false);
        return;
      }

      const formatted = formatShortcut(e);
      if (formatted) {
        onChange(formatted);
        setIsCapturing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCapturing, onChange]);

  return { isCapturing, beginCapture };
}
