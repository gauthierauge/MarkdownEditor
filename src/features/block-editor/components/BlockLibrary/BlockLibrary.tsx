import { useState } from 'react'
import BlockFormDialog from '../BlockForm/BlockFormDialog'
import SearchBar from './SearchBar'
import BlockListItem from './BlockListItem'
import { useBlockLibrary } from './useBlockLibrary'
import { Button } from '@/shared/components/ui/button'

function BlockLibrary() {
  const { blocks, filtered, searchQuery, setSearchQuery } = useBlockLibrary()
  const [dialogBlockId, setDialogBlockId] = useState<string | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const openCreate = () => {
    setDialogBlockId(undefined)
    setDialogOpen(true)
  }

  const openEdit = (blockId: string) => {
    setDialogBlockId(blockId)
    setDialogOpen(true)
  }

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <div className="flex-1">
          <SearchBar onChange={setSearchQuery} value={searchQuery} />
        </div>
        <Button onClick={openCreate} size="xs" variant="outline">
          + Nouveau
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-sm italic text-muted-foreground">
            {blocks.length === 0 ? 'Aucun bloc' : 'Aucun resultat'}
          </p>
        ) : (
          filtered.map((block) => (
            <BlockListItem block={block} key={block.id} onEdit={openEdit} />
          ))
        )}
      </div>

      <BlockFormDialog
        blockId={dialogBlockId}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </>
  )
}

export default BlockLibrary
