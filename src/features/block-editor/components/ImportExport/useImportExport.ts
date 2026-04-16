import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks.ts';
import { importBlocks } from '@/shared/store/blocksSlice.ts';
import { serializeBlock, serializeBlocks, sanitizeFilename } from '@/features/block-editor/services/fileFormat.ts';
import type { Block } from '@/features/block-editor/types/block.types.ts';

export function useImportExport() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((s) => s.blocks.blocks);
  const [selectedExportId, setSelectedExportId] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedBlock = blocks.find((b) => b.id === selectedExportId);

  const getAllContent = useCallback(() => serializeBlocks(blocks), [blocks]);
  const getAllFilename = useCallback(() => 'bibliotheque.parts.mdlc', []);

  const getSingleContent = useCallback(
    () => (selectedBlock ? serializeBlock(selectedBlock) : ''),
    [selectedBlock],
  );
  const getSingleFilename = useCallback(
    () => (selectedBlock ? `${sanitizeFilename(selectedBlock.name)}.part.mdlc` : ''),
    [selectedBlock],
  );

  const handleImport = useCallback(
    (imported: Block[]) => {
      dispatch(importBlocks(imported));
      setFeedback(`${imported.length} bloc${imported.length > 1 ? 's' : ''} importé${imported.length > 1 ? 's' : ''}`);
      setTimeout(() => setFeedback(null), 3000);
    },
    [dispatch],
  );

  const handleError = useCallback((msg: string) => {
    alert('Erreur import : ' + msg);
  }, []);

  return {
    blocks,
    selectedExportId,
    setSelectedExportId,
    selectedBlock,
    getAllContent,
    getAllFilename,
    getSingleContent,
    getSingleFilename,
    handleImport,
    handleError,
    feedback,
  };
}
