import { useState } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { selectAllBlocks } from '@/shared/store/slices/blocksSlice';

export function useBlockLibrary() {
  const blocks = useAppSelector(selectAllBlocks);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = blocks.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return { blocks, filtered, searchQuery, setSearchQuery };
}
