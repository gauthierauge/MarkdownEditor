import { useShortcutManager } from './useShortcutManager.ts';
import ShortcutInput from './ShortcutInput.tsx';

export default function ShortcutManager() {
  const { blocks, handleChange } = useShortcutManager();

  if (blocks.length === 0) {
    return (
      <div className="bg-[#1f1f1f] rounded-lg p-4 border border-[#2e303a]">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 m-0 mb-3">
          Raccourcis clavier
        </h2>
        <p className="text-sm text-gray-600 italic">
          Créez d'abord un bloc pour lui assigner un raccourci
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f1f] rounded-lg p-4 border border-[#2e303a]">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 m-0 mb-3">
        Raccourcis clavier
      </h2>
      <div className="flex flex-col gap-2">
        {blocks.map((block) => (
          <div key={block.id} className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-300 truncate">{block.name}</span>
            <ShortcutInput
              value={block.shortcut}
              onChange={(shortcut) => handleChange(block.id, shortcut)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
