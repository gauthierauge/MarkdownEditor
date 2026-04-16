import type { Block } from '@/features/block-editor/types/block.ts';
import type { PartFile, PartsFile, ParsedFile } from '@/features/block-editor/types/fileFormat.ts';

function normalizeBlock(raw: Record<string, unknown>): Block {
  if (typeof raw.name !== 'string' || !raw.name) throw new Error('Bloc invalide : "name" requis');
  if (typeof raw.content !== 'string') throw new Error('Bloc invalide : "content" requis');
  return {
    id: typeof raw.id === 'string' ? raw.id : '',
    name: raw.name,
    content: raw.content,
    shortcut: typeof raw.shortcut === 'string' ? raw.shortcut : null,
  };
}

export function serializeBlock(block: Block): string {
  const file: PartFile = { version: '1.0', type: 'part', block };
  return JSON.stringify(file, null, 2);
}

export function serializeBlocks(blocks: Block[]): string {
  const file: PartsFile = { version: '1.0', type: 'parts', blocks };
  return JSON.stringify(file, null, 2);
}

export function deserializeFile(json: string): ParsedFile {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new Error('JSON invalide');
  }

  if (!data || typeof data !== 'object') throw new Error('Format invalide');

  const obj = data as Record<string, unknown>;
  if (typeof obj.version !== 'string') throw new Error('"version" manquant');

  if (obj.type === 'part') {
    if (!obj.block || typeof obj.block !== 'object') throw new Error('"block" manquant ou invalide');
    return { type: 'part', blocks: [normalizeBlock(obj.block as Record<string, unknown>)] };
  }

  if (obj.type === 'parts') {
    if (!Array.isArray(obj.blocks)) throw new Error('"blocks" doit être un tableau');
    return { type: 'parts', blocks: obj.blocks.map((b: unknown) => {
      if (!b || typeof b !== 'object') throw new Error('Bloc invalide dans le tableau');
      return normalizeBlock(b as Record<string, unknown>);
    })};
  }

  throw new Error(`Type inconnu : "${String(obj.type)}"`);
}

export function sanitizeFilename(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-');
}

export function downloadFile(filename: string, content: string, mimeType = 'application/json') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
