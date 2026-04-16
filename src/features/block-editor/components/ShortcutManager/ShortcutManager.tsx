import { useShortcutManager } from './useShortcutManager.ts'
import ShortcutInput from './ShortcutInput.tsx'

export default function ShortcutManager() {
  const { blocks, handleChange } = useShortcutManager()

  if (blocks.length === 0) {
    return (
      <div className="rounded-[20px] border border-[rgba(215,221,228,0.9)] bg-white/90 p-4 shadow-[var(--color-shadow)]">
        <h2 className="m-0 mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          Raccourcis clavier
        </h2>
        <p className="text-sm italic text-[var(--color-text-muted)]">
          Creez d'abord un bloc pour lui assigner un raccourci
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-[20px] border border-[rgba(215,221,228,0.9)] bg-white/90 p-4 shadow-[var(--color-shadow)]">
      <h2 className="m-0 mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
        Raccourcis clavier
      </h2>
      <div className="flex flex-col gap-2">
        {blocks.map((block) => (
          <div key={block.id} className="flex items-center justify-between gap-3">
            <span className="truncate text-sm text-[var(--color-text)]">
              {block.name}
            </span>
            <ShortcutInput
              value={block.shortcut}
              onChange={(shortcut) => handleChange(block.id, shortcut)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
