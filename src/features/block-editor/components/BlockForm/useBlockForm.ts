import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { addBlock, updateBlock, renameBlock, deleteBlock, selectBlockById } from '@/shared/store/blocksSlice';

export function useBlockForm(blockId?: string, onSaved?: () => void) {
  const dispatch = useAppDispatch();
  const block = useAppSelector((state) =>
    blockId ? selectBlockById(state, blockId) : undefined,
  );

  const [prevBlockId, setPrevBlockId] = useState<string | undefined>(blockId);
  const [name, setName] = useState<string>(block?.name ?? '');
  const [content, setContent] = useState<string>(block?.content ?? '');

  if (prevBlockId !== blockId) {
    setPrevBlockId(blockId);
    setName(block?.name ?? '');
    setContent(block?.content ?? '');
  }

  const isEditing = !!blockId && !!block;
  const canSave = name.trim().length > 0;

  const handleCreate = () => {
    dispatch(addBlock({ name: name.trim(), content }));
    setName('');
    setContent('');
    onSaved?.();
  };

  const handleUpdate = () => {
    if (!block) return;
    if (name.trim() !== block.name) dispatch(renameBlock({ id: block.id, name: name.trim() }));
    if (content !== block.content) dispatch(updateBlock({ id: block.id, content }));
    onSaved?.();
  };

  const handleDelete = () => {
    if (!block) return;
    dispatch(deleteBlock(block.id));
    onSaved?.();
  };

  return {
    name,
    setName,
    content,
    setContent,
    isEditing,
    canSave,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
