import type { ParsedShortcut } from '@/features/block-editor/types/shortcut.types.ts';

const MODIFIER_KEYS = new Set(['Control', 'Shift', 'Alt', 'Meta']);

function parseShortcut(combo: string): ParsedShortcut {
  const parts = combo.split('+');
  return {
    ctrl: parts.includes('Ctrl'),
    alt: parts.includes('Alt'),
    shift: parts.includes('Shift'),
    meta: parts.includes('Meta'),
    key: parts[parts.length - 1].toUpperCase(),
  };
}

export function matchShortcut(event: KeyboardEvent, combo: string): boolean {
  const parsed = parseShortcut(combo);
  if (event.ctrlKey !== parsed.ctrl) return false;
  if (event.altKey !== parsed.alt) return false;
  if (event.shiftKey !== parsed.shift) return false;
  if (event.metaKey !== parsed.meta) return false;
  return event.key.toUpperCase() === parsed.key;
}

export function formatShortcut(event: KeyboardEvent): string | null {
  if (MODIFIER_KEYS.has(event.key)) return null;

  const parts: string[] = [];
  if (event.ctrlKey) parts.push('Ctrl');
  if (event.altKey) parts.push('Alt');
  if (event.shiftKey) parts.push('Shift');
  if (event.metaKey) parts.push('Meta');

  parts.push(event.key.length === 1 ? event.key.toUpperCase() : event.key);
  return parts.join('+');
}
