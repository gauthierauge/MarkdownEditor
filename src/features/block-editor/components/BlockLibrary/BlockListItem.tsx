import { useBlockListItem } from './useBlockListItem.ts';
import type { Block } from '@/features/block-editor/types/block.ts';

type Props = { block: Block };

export default function BlockListItem({ block }: Props) {
  const { handleInsert, handleEdit } = useBlockListItem(block);

  return (
    <div
      onClick={handleInsert}
      className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-[#252525] transition-colors group"
    >
      <span className="flex-1 text-sm text-gray-300 truncate">{block.name}</span>
      {block.shortcut && (
        <span className="text-[11px] text-gray-500 bg-[#1a1a2e] px-1.5 py-0.5 rounded font-mono">
          {block.shortcut}
        </span>
      )}
      <button
        onClick={handleEdit}
        className="text-gray-600 hover:text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        ✏️
      </button>
    </div>
  );
}
