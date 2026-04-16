import { useAppDispatch } from '@/shared/store/hooks.ts';
import { insertAtCursor } from '@/shared/store/editorSlice.ts';
import { selectBlock } from '@/shared/store/uiSlice.ts';
import type { Block } from '@/features/block-editor/types/block.types.ts';

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
