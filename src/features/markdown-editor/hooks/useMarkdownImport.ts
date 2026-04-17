import { nanoid } from '@reduxjs/toolkit'
import { useCallback, useRef, type ChangeEvent } from 'react'
import { readFileAsText } from '@/features/markdown-editor/services/markdown.service'
import { useAppDispatch } from '@/shared/store/hooks'
import { importFileNode } from '@/shared/store/slices/foldersSlice'
import { openFile, saveFileContent } from '@/shared/store/slices/markdownSlice'

type UseMarkdownImportOptions = {
  onImported?: (fileId: string) => void
}

export function useMarkdownImport(options?: UseMarkdownImportOptions) {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (!file) {
        return
      }

      const id = nanoid()
      const name = file.name
      const text = await readFileAsText(file)

      dispatch(importFileNode({ id, name, parentId: null }))
      dispatch(saveFileContent({ content: text, id }))
      dispatch(openFile({ id, name }))
      options?.onImported?.(id)

      event.target.value = ''
    },
    [dispatch, options],
  )

  return { handleFileChange, handleImportClick, inputRef }
}
