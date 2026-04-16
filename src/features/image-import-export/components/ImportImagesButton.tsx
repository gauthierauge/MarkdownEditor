import { useRef } from 'react'
import type { StoredImage } from '@/features/image-library/types'
import { Button } from '@/shared/components'
import { readFileAsText } from '@/utils/fileReaders'
import { parseImportedImages } from '@/utils/imageFormat'

type ImportImagesButtonProps = {
  onError: (message: string) => void
  onImport: (images: StoredImage[]) => Promise<void> | void
}

function ImportImagesButton({ onError, onImport }: ImportImagesButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function handleFiles(files: FileList | null) {
    if (!files?.length) {
      return
    }

    try {
      const importedImages = (
        await Promise.all(
          Array.from(files).map(async (file) => {
            const content = await readFileAsText(file)
            return parseImportedImages(content)
          }),
        )
      ).flat()

      await onImport(importedImages)
    } catch (error) {
      onError(
        error instanceof Error
          ? error.message
          : 'L’import des images a échoué.',
      )
    }
  }

  return (
    <>
      <input
        accept=".img.mdlc,.imgs.mdlc,application/json"
        className="visually-hidden"
        multiple
        onChange={(event) => {
          void handleFiles(event.target.files)
          event.target.value = ''
        }}
        ref={inputRef}
        type="file"
      />
      <Button onClick={() => inputRef.current?.click()} variant="secondary">
        Importer
      </Button>
    </>
  )
}

export default ImportImagesButton
