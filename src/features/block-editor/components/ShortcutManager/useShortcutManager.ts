import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setShortcut } from '@/store/blocksSlice.ts';

export function useShortcutManager() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((s) => s.blocks.blocks);

  const handleChange = (id: string, shortcut: string | null) => {
    dispatch(setShortcut({ id, shortcut }));
  };

  return { blocks, handleChange };
}
