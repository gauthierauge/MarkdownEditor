import { useBlockForm } from './useBlockForm.ts';
import BlockPreview from './BlockPreview.tsx';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';

type Props = {
  blockId?: string;
  onSaved?: () => void;
};

export default function BlockForm({ blockId, onSaved }: Props) {
  const {
    name, setName,
    content, setContent,
    isEditing, canSave,
    handleCreate, handleUpdate, handleDelete,
  } = useBlockForm(blockId, onSaved);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
          {isEditing ? 'Modifier le bloc' : 'Nouveau bloc'}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-3 flex-1">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du bloc"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu markdown du bloc..."
            className="font-mono flex-1 min-h-[250px] resize-y"
          />
        </div>

        <div className="flex-1 rounded border border-border overflow-auto min-h-[250px]">
          <BlockPreview content={content} />
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        {isEditing ? (
          <>
            <Button
              onClick={handleDelete}
              variant="destructive"
              size="sm"
            >
              Supprimer
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!canSave}
              variant="outline"
              size="sm"
            >
              Enregistrer
            </Button>
          </>
        ) : (
          <Button
            onClick={handleCreate}
            disabled={!canSave}
            variant="outline"
            size="sm"
          >
            Créer le bloc
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
