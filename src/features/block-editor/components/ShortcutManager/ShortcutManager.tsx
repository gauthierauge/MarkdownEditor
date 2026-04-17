import { useShortcutManager } from './useShortcutManager';
import ShortcutInput from './ShortcutInput';

export default function ShortcutManager() {
  const { blocks, handleChange } = useShortcutManager();

  if (blocks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Créez d'abord un bloc pour lui assigner un raccourci
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {blocks.map((block) => (
        <div key={block.id} className="flex items-center justify-between gap-2 px-1 py-1.5 rounded hover:bg-accent/50 transition-colors">
          <span className="text-sm text-foreground truncate">{block.name}</span>
          <ShortcutInput
            value={block.shortcut}
            onChange={(shortcut) => handleChange(block.id, shortcut)}
          />
        </div>
      ))}
    </div>
  );
}
