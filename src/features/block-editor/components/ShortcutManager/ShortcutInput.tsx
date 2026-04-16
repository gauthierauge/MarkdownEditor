import { useShortcutInput } from './useShortcutInput.ts';

type Props = {
  value: string | null;
  onChange: (shortcut: string | null) => void;
};

export default function ShortcutInput({ value, onChange }: Props) {
  const { isCapturing, beginCapture } = useShortcutInput(onChange);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={beginCapture}
        className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
          isCapturing
            ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400 animate-pulse'
            : 'bg-[#1a1a2e] border-[#2e303a] text-gray-400 hover:border-gray-500'
        }`}
      >
        {isCapturing
          ? 'Appuyez sur une combinaison...'
          : value ?? 'Aucun raccourci'}
      </button>
      {value && (
        <button
          onClick={() => onChange(null)}
          className="text-gray-600 hover:text-red-400 text-xs px-1 transition-colors cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
}
