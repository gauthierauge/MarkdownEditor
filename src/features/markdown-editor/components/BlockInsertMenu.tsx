import { useAppSelector } from '@/shared/store/hooks';
import { selectAllBlocks } from '@/shared/store/slices/blocksSlice';
import { useEditorInsert } from '@/shared/context/editor-insert/useEditorInsert';
import { Badge } from '@/shared/components/ui/badge';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export default function BlockInsertMenu() {
  const blocks = useAppSelector(selectAllBlocks);
  const { insertText } = useEditorInsert();

  return (
    <Select
      value={null}
      onValueChange={(id) => {
        const block = blocks.find((b) => b.id === id);
        if (block) insertText(block.content);
      }}
    >
      <SelectTrigger size="sm" title="Insérer un bloc">
        <SelectValue placeholder="Bloc">
          <Plus className="w-3.5 h-3.5" /> Bloc
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false} sideOffset={6}>
        {blocks.length === 0 ? (
          <SelectItem value="__empty__" disabled>
            Aucun bloc disponible
          </SelectItem>
        ) : (
          blocks.map((block) => (
            <SelectItem key={block.id} value={block.id}>
              <span className="flex w-full items-center justify-between gap-2">
                <span className="truncate">{block.name}</span>
                {block.shortcut && (
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {block.shortcut}
                  </Badge>
                )}
              </span>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
