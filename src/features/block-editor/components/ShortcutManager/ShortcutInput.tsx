import { useShortcutInput } from './useShortcutInput.ts';
import { Button } from '@/shared/components/ui/button';

type Props = {
  value: string | null;
  onChange: (shortcut: string | null) => void;
};

export default function ShortcutInput({ value, onChange }: Props) {
  const { isCapturing, beginCapture } = useShortcutInput(onChange);

  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={beginCapture}
        variant="outline"
        size="xs"
        className={`font-mono ${isCapturing ? 'animate-pulse border-ring text-foreground' : ''}`}
      >
        {isCapturing
          ? 'Appuyez sur une combinaison...'
          : value ?? 'Aucun raccourci'}
      </Button>
      {value && (
        <Button
          onClick={() => onChange(null)}
          variant="ghost"
          size="icon-xs"
        >
          ✕
        </Button>
      )}
    </div>
  );
}
