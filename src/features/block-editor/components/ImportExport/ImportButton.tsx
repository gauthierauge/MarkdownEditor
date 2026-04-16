import { useRef } from 'react';
import { deserializeFile } from '@/features/block-editor/utils/fileFormat.ts';
import type { Block } from '@/features/block-editor/types/block.ts';

type Props = {
  onImport: (blocks: Block[]) => void;
  onError?: (message: string) => void;
};

export default function ImportButton({ onImport, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = deserializeFile(reader.result as string);
        onImport(parsed.blocks);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erreur inconnue';
        onError ? onError(msg) : alert('Erreur import : ' + msg);
      }
    };
    reader.readAsText(file);

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="px-3 py-1.5 text-xs rounded bg-[#1a1a2e] text-gray-300 border border-[#2e303a] hover:border-gray-500 transition-colors cursor-pointer"
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
  );
}
