import type { InsertResult } from '@/features/markdown-editor/types/editor.types';

export function insertTextAt(content: string, position: number, text: string): InsertResult {
  const before = content.slice(0, position);
  const after = content.slice(position);
  return {
    content: before + text + after,
    cursorPosition: position + text.length,
  };
}

export function ensureMdExtension(filename: string): string {
  return filename.endsWith('.md') ? filename : `${filename}.md`;
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsText(file);
  });
}
