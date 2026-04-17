import { useState } from 'react';
import { useBlockLibrary } from './useBlockLibrary';
import SearchBar from './SearchBar';
import BlockListItem from './BlockListItem';
import BlockFormDialog from '../BlockForm/BlockFormDialog';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function BlockLibrary() {
  const { blocks, filtered, searchQuery, setSearchQuery } = useBlockLibrary();
  const [dialogBlockId, setDialogBlockId] = useState<string | undefined>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const openCreate = () => {
    setDialogBlockId(undefined);
    setDialogOpen(true);
  };

  const openEdit = (blockId: string) => {
    setDialogBlockId(blockId);
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
            Bibliothèque de blocs
          </CardTitle>
          <Button variant="ghost" size="xs" onClick={openCreate}>
            + Nouveau
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground italic text-center py-4">
                {blocks.length === 0 ? 'Aucun bloc' : 'Aucun résultat'}
              </p>
            ) : (
              filtered.map((b) => (
                <BlockListItem key={b.id} block={b} onEdit={openEdit} />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <BlockFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        blockId={dialogBlockId}
      />
    </>
  );
}
