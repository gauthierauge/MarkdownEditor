import { Button } from '@/shared/components/ui/button'
import { useShortcutInput } from './useShortcutInput'

type Props = {
  onChange: (shortcut: string | null) => void
  value: string | null
}

function ShortcutInput({ onChange, value }: Props) {
  const { beginCapture, isCapturing } = useShortcutInput(onChange)

  return (
    <div className="flex items-center gap-1">
      <Button
        className={isCapturing ? 'animate-pulse border-ring text-foreground' : 'font-mono'}
        onClick={beginCapture}
        size="xs"
        variant="outline"
      >
        {isCapturing ? 'Appuye sur une combinaison...' : value ?? 'Aucun raccourci'}
      </Button>

      {value ? (
        <Button onClick={() => onChange(null)} size="icon-xs" variant="ghost">
          X
        </Button>
      ) : null}
    </div>
  )
}

export default ShortcutInput
