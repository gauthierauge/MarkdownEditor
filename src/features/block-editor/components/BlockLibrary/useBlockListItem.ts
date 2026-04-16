import { useAppDispatch } from '@/store/hooks.ts';
import { insertAtCursor } from '@/store/editorSlice.ts';
import { selectBlock } from '@/store/uiSlice.ts';
import type { Block } from '@/store/blocksSlice.ts';

export function useBlockListItem(block: Block) {
  const dispatch = useAppDispatch();

  const handleInsert = () => {
    dispatch(insertAtCursor(block.content));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectBlock(block.id));
  };

  return { handleInsert, handleEdit };
}
