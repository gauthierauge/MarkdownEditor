import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setShortcut } from '@/shared/store/blocksSlice';

export function useShortcutManager() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((s) => s.blocks.blocks);

  const handleChange = (id: string, shortcut: string | null) => {
    dispatch(setShortcut({ id, shortcut }));
  };

  return { blocks, handleChange };
}
