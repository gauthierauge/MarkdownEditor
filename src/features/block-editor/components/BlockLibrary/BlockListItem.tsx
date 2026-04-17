import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { useBlockListItem } from './useBlockListItem'
import type { Block } from '@/features/block-editor/types/block.types'

type Props = {
  block: Block
  onEdit: (blockId: string) => void
}

function BlockListItem({ block, onEdit }: Props) {
  const { handleEdit, handleInsert } = useBlockListItem(block, onEdit)

  return (
    <div
      className="group flex items-center gap-2 rounded px-3 py-2 transition-colors hover:bg-accent"
      onClick={handleInsert}
    >
      <span className="flex-1 truncate text-sm text-foreground">{block.name}</span>

      {block.shortcut ? (
        <Badge className="font-mono" variant="outline">
          {block.shortcut}
        </Badge>
      ) : null}

      <Button
        className="opacity-0 transition-opacity group-hover:opacity-100"
        onClick={handleEdit}
        size="icon-xs"
        variant="ghost"
      >
        Editer
      </Button>
    </div>
  )
}

export default BlockListItem
