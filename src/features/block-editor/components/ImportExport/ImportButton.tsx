import { useRef, type ChangeEvent } from 'react'
import { deserializeFile } from '@/features/block-editor/services/fileFormat.service'
import type { Block } from '@/features/block-editor/types/block.types'
import { Button } from '@/shared/components/ui/button'

type Props = {
  onError?: (message: string) => void
  onImport: (blocks: Block[]) => void
}

function ImportButton({ onError, onImport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const parsed = deserializeFile(reader.result as string)
        onImport(parsed.blocks)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue'
        if (onError) {
          onError(message)
        } else {
          alert(`Erreur import : ${message}`)
        }
      }
    }

    reader.readAsText(file)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <Button
        onClick={() => inputRef.current?.click()}
        size="xs"
        variant="outline"
      >
        Importer
      </Button>
      <input
        accept=".mdlc,.part.mdlc,.parts.mdlc,application/json"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
    </>
  )
}

export default ImportButton
