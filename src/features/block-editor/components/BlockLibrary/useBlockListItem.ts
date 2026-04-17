import { useEditorInsert } from '@/shared/context/editor-insert/useEditorInsert';
import type { Block } from '@/features/block-editor/types/block.types';
import type React from 'react';

export function useBlockListItem(block: Block, onEdit: (blockId: string) => void) {
  const { insertText } = useEditorInsert();

  const handleInsert = () => {
    insertText(block.content);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(block.id);
  };

  return { handleInsert, handleEdit };
}
