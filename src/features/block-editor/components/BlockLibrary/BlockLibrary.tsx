import { useBlockLibrary } from './useBlockLibrary.ts'
import SearchBar from './SearchBar.tsx'
import BlockListItem from './BlockListItem.tsx'

export default function BlockLibrary() {
  const { blocks, filtered, searchQuery, setSearchQuery } = useBlockLibrary()

  return (
    <div className="flex h-full flex-col gap-3 rounded-[20px] border border-[rgba(215,221,228,0.9)] bg-white/90 p-4 shadow-[var(--color-shadow)]">
      <h2 className="m-0 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
        Bibliotheque de blocs
      </h2>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-sm italic text-[var(--color-text-muted)]">
            {blocks.length === 0 ? 'Aucun bloc' : 'Aucun resultat'}
          </p>
        ) : (
          filtered.map((block) => <BlockListItem key={block.id} block={block} />)
        )}
      </div>
    </div>
  )
}
