import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setShortcut, selectAllBlocks } from '@/shared/store/blocksSlice';

export function useShortcutManager() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(selectAllBlocks);

  const handleChange = (id: string, shortcut: string | null) => {
    dispatch(setShortcut({ id, shortcut }));
  };

  return { blocks, handleChange };
}
