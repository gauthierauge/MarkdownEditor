import { useState } from 'react';
import { useBlockLibrary } from './useBlockLibrary';
import SearchBar from './SearchBar';
import BlockListItem from './BlockListItem';
import BlockFormDialog from '../BlockForm/BlockFormDialog';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';

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
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <Button variant="outline" size="xs" onClick={openCreate}>
          <Plus className="w-3.5 h-3.5" /> Nouveau
        </Button>
      </div>
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

      <BlockFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        blockId={dialogBlockId}
      />
    </>
  );
}
