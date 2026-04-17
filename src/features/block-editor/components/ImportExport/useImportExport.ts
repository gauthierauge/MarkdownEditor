import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { importBlocks, selectAllBlocks } from '@/shared/store/slices/blocksSlice';
import { serializeBlock, serializeBlocks, sanitizeFilename } from '@/features/block-editor/services/fileFormat.service';
import type { Block } from '@/features/block-editor/types/block.types';

export function useImportExport() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(selectAllBlocks);
  const [selectedExportId, setSelectedExportId] = useState<string>('');

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
      toast.success(`${imported.length} bloc${imported.length > 1 ? 's' : ''} importé${imported.length > 1 ? 's' : ''}`);
    },
    [dispatch],
  );

  const handleError = useCallback((msg: string) => {
    toast.error('Erreur import : ' + msg);
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
  };
}
