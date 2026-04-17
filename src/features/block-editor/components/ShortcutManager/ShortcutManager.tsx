import { useShortcutManager } from './useShortcutManager';
import ShortcutInput from './ShortcutInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function ShortcutManager() {
  const { blocks, handleChange } = useShortcutManager();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
          Raccourcis clavier
        </CardTitle>
      </CardHeader>
      <CardContent>
        {blocks.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Créez d'abord un bloc pour lui assigner un raccourci
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {blocks.map((block) => (
              <div key={block.id} className="flex items-center justify-between gap-3">
                <span className="text-sm text-foreground truncate">{block.name}</span>
                <ShortcutInput
                  value={block.shortcut}
                  onChange={(shortcut) => handleChange(block.id, shortcut)}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
