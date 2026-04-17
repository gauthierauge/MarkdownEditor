import ShortcutInput from './ShortcutInput'
import { useShortcutManager } from './useShortcutManager'

function ShortcutManager() {
  const { blocks, handleChange } = useShortcutManager()

  if (blocks.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Cree d abord un bloc pour lui assigner un raccourci.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {blocks.map((block) => (
        <div
          className="flex items-center justify-between gap-2 rounded px-1 py-1.5 transition-colors hover:bg-accent/50"
          key={block.id}
        >
          <span className="truncate text-sm text-foreground">{block.name}</span>
          <ShortcutInput
            onChange={(shortcut) => handleChange(block.id, shortcut)}
            value={block.shortcut}
          />
        </div>
      ))}
    </div>
  )
}

export default ShortcutManager
