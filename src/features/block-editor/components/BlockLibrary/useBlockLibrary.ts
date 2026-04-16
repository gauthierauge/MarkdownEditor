import { useState } from 'react';
import { useAppSelector } from '@/shared/store/hooks.ts';

export function useBlockLibrary() {
  const blocks = useAppSelector((s) => s.blocks.blocks);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blocks.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return { blocks, filtered, searchQuery, setSearchQuery };
}
