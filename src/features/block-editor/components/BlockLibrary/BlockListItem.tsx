import { useBlockListItem } from './useBlockListItem.ts'
import type { Block } from '@/store/blocksSlice.ts'

type Props = { block: Block }

export default function BlockListItem({ block }: Props) {
  const { handleInsert, handleEdit } = useBlockListItem(block)

  return (
    <div
      onClick={handleInsert}
      className="group flex cursor-pointer items-center gap-2 rounded-[12px] px-3 py-2 transition-colors hover:bg-[var(--color-primary-soft)]"
    >
      <span className="flex-1 truncate text-sm text-[var(--color-text)]">
        {block.name}
      </span>
      {block.shortcut && (
        <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1 font-mono text-[11px] text-[var(--color-text-muted)]">
          {block.shortcut}
        </span>
      )}
      <button
        onClick={handleEdit}
        className="cursor-pointer px-1 text-sm text-[var(--color-text-muted)] opacity-0 transition-opacity hover:text-[var(--color-primary)] group-hover:opacity-100"
      >
        Editer
      </button>
    </div>
  )
}
