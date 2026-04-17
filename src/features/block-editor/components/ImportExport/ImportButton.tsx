import React, { useRef } from 'react';
import { deserializeFile } from '@/features/block-editor/services/fileFormat.service';
import type { Block } from '@/features/block-editor/types/block.types';
import { Button } from '@/shared/components/ui/button';

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
      <Button
        onClick={() => inputRef.current?.click()}
        variant="outline"
        size="xs"
      >
        Importer
      </Button>
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
