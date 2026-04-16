import { useBlockLibrary } from './useBlockLibrary.ts';
import SearchBar from './SearchBar.tsx';
import BlockListItem from './BlockListItem.tsx';

export default function BlockLibrary() {
  const { blocks, filtered, searchQuery, setSearchQuery } = useBlockLibrary();

  return (
    <div className="flex flex-col gap-3 bg-[#1f1f1f] rounded-lg p-4 border border-[#2e303a] h-full">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 m-0">
        Bibliothèque de blocs
      </h2>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-600 italic text-center py-4">
            {blocks.length === 0 ? 'Aucun bloc' : 'Aucun résultat'}
          </p>
        ) : (
          filtered.map((b) => <BlockListItem key={b.id} block={b} />)
        )}
      </div>
    </div>
  );
}
