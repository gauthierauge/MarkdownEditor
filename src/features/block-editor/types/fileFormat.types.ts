import type { Block } from '@/features/block-editor/types/block.types';

export type PartFile = {
  version: string;
  type: 'part';
  block: Block;
};

export type PartsFile = {
  version: string;
  type: 'parts';
  blocks: Block[];
};

export type ParsedFile = {
  type: 'part' | 'parts';
  blocks: Block[];
};
