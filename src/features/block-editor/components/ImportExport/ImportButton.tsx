import { useRef } from 'react'
import { deserializeFile } from '@/features/block-editor/services/fileFormat.ts';
import type { Block } from '@/features/block-editor/types/block.types.ts';

type Props = {
  onImport: (blocks: Block[]) => void
  onError?: (message: string) => void
}

export default function ImportButton({ onImport, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = deserializeFile(reader.result as string)
        onImport(parsed.blocks)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue'
        onError ? onError(message) : alert('Erreur import : ' + message)
      }
    }
    reader.readAsText(file)

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-primary)] px-3 py-1.5 text-xs text-white transition-colors hover:brightness-95"
      >
        Importer
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".mdlc,.part.mdlc,.parts.mdlc,application/json"
        onChange={handleChange}
        className="hidden"
      />
    </>
  )
}
