import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks.ts';
import { addBlock, updateBlock, renameBlock, deleteBlock } from '@/shared/store/blocksSlice.ts';

export function useBlockForm(blockId?: string, onSaved?: () => void) {
  const dispatch = useAppDispatch();
  const block = useAppSelector((s) =>
    blockId ? s.blocks.blocks.find((b) => b.id === blockId) : undefined,
  );

  const [trackedBlockId, setTrackedBlockId] = useState<string | undefined>(blockId);
  const [name, setName] = useState<string>(block?.name ?? '');
  const [content, setContent] = useState<string>(block?.content ?? '');

  if (trackedBlockId !== blockId) {
    setTrackedBlockId(blockId);
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
    if (!window.confirm('Supprimer ce bloc ?')) return;
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
