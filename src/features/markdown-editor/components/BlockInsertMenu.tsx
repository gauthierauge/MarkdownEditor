import { useAppSelector } from '@/shared/store/hooks';
import { selectAllBlocks } from '@/shared/store/slices/blocksSlice';
import { useEditorInsert } from '@/shared/context/editor-insert/useEditorInsert';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

export default function BlockInsertMenu() {
  const blocks = useAppSelector(selectAllBlocks);
  const { insertText } = useEditorInsert();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="xs" title="Insérer un bloc">
            + Bloc
          </Button>
        }
      />
      <PopoverContent align="end" className="w-56 p-1">
        {blocks.length === 0 ? (
          <p className="px-2 py-1.5 text-xs text-muted-foreground">
            Aucun bloc disponible
          </p>
        ) : (
          blocks.map((block) => (
            <button
              key={block.id}
              className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
              onClick={() => insertText(block.content)}
            >
              <span className="truncate">{block.name}</span>
              {block.shortcut && (
                <Badge variant="secondary" className="ml-2 text-[10px] shrink-0">
                  {block.shortcut}
                </Badge>
              )}
            </button>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
