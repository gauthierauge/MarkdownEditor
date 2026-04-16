import { useShortcutInput } from './useShortcutInput.ts'

type Props = {
  value: string | null
  onChange: (shortcut: string | null) => void
}

export default function ShortcutInput({ value, onChange }: Props) {
  const { isCapturing, beginCapture } = useShortcutInput(onChange)

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={beginCapture}
        className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
          isCapturing
            ? 'border-[rgba(31,79,143,0.28)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
            : 'border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
        }`}
      >
        {isCapturing ? 'Appuyez sur une combinaison...' : value ?? 'Aucun raccourci'}
      </button>
      {value && (
        <button
          onClick={() => onChange(null)}
          className="cursor-pointer px-1 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-danger)]"
        >
          Effacer
        </button>
      )}
    </div>
  )
}
