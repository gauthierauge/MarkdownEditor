import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { importBlocks, selectAllBlocks } from '@/shared/store/slices/blocksSlice'
import {
  sanitizeFilename,
  serializeBlock,
  serializeBlocks,
} from '@/features/block-editor/services/fileFormat.service'
import type { Block } from '@/features/block-editor/types/block.types'

export function useImportExport() {
  const dispatch = useAppDispatch()
  const blocks = useAppSelector(selectAllBlocks)
  const [selectedExportId, setSelectedExportId] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const selectedBlock = blocks.find((block) => block.id === selectedExportId)

  const getAllContent = useCallback(() => serializeBlocks(blocks), [blocks])
  const getAllFilename = useCallback(() => 'bibliotheque.parts.mdlc', [])

  const getSingleContent = useCallback(
    () => (selectedBlock ? serializeBlock(selectedBlock) : ''),
    [selectedBlock],
  )
  const getSingleFilename = useCallback(
    () => (selectedBlock ? `${sanitizeFilename(selectedBlock.name)}.part.mdlc` : ''),
    [selectedBlock],
  )

  const handleImport = useCallback(
    (imported: Block[]) => {
      dispatch(importBlocks(imported))
      setFeedback(
        `${imported.length} bloc${imported.length > 1 ? 's' : ''} importe${imported.length > 1 ? 's' : ''}`,
      )
      setTimeout(() => setFeedback(null), 3000)
    },
    [dispatch],
  )

  const handleError = useCallback((message: string) => {
    alert(`Erreur import : ${message}`)
  }, [])

  return {
    blocks,
    feedback,
    getAllContent,
    getAllFilename,
    getSingleContent,
    getSingleFilename,
    handleError,
    handleImport,
    selectedBlock,
    selectedExportId,
    setSelectedExportId,
  }
}
