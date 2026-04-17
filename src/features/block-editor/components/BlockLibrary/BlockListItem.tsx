import { useBlockListItem } from './useBlockListItem';
import type { Block } from '@/features/block-editor/types/block.types';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

type Props = { block: Block; onEdit: (blockId: string) => void };

export default function BlockListItem({ block, onEdit }: Props) {
  const { handleInsert, handleEdit } = useBlockListItem(block, onEdit);

  return (
    <div
      onClick={handleInsert}
      className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-accent transition-colors group"
    >
      <span className="flex-1 text-sm text-foreground truncate">{block.name}</span>
      {block.shortcut && (
        <Badge variant="outline" className="font-mono">
          {block.shortcut}
        </Badge>
      )}
      <Button
        onClick={handleEdit}
        variant="ghost"
        size="icon-xs"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✏️
      </Button>
    </div>
  );
}
