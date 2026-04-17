import { useBlockLibrary } from './useBlockLibrary.ts';
import SearchBar from './SearchBar.tsx';
import BlockListItem from './BlockListItem.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function BlockLibrary() {
  const { blocks, filtered, searchQuery, setSearchQuery } = useBlockLibrary();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
          Bibliothèque de blocs
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground italic text-center py-4">
              {blocks.length === 0 ? 'Aucun bloc' : 'Aucun résultat'}
            </p>
          ) : (
            filtered.map((b) => <BlockListItem key={b.id} block={b} />)
          )}
        </div>
      </CardContent>
    </Card>
  );
}
