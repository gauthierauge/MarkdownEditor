import { useBlockForm } from './useBlockForm';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import MarkdownPreview from '@/shared/components/MarkdownPreview';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blockId?: string;
};

export default function BlockFormDialog({ open, onOpenChange, blockId }: Props) {
  const {
    name, setName,
    content, setContent,
    isEditing, canSave,
    handleCreate, handleUpdate, handleDelete,
  } = useBlockForm(blockId, () => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le bloc' : 'Nouveau bloc'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 min-h-[250px]">
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
              className="font-mono flex-1 min-h-[200px] resize-y"
            />
          </div>

          <div className="flex-1 rounded border border-border overflow-auto p-3">
            <MarkdownPreview
              content={content}
              emptyMessage="Aperçu du bloc..."
            />
          </div>
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button onClick={handleDelete} variant="destructive" size="sm">
                Supprimer
              </Button>
              <Button onClick={handleUpdate} disabled={!canSave} variant="outline" size="sm">
                Enregistrer
              </Button>
            </>
          ) : (
            <Button onClick={handleCreate} disabled={!canSave} variant="outline" size="sm">
              Créer le bloc
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
