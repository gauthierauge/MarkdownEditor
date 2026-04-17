import { useBlockForm } from './useBlockForm';
import DeleteBlockDialog from './DeleteBlockDialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import MarkdownPreview from '@/shared/components/MarkdownPreview/MarkdownPreview';
import { useAppSelector } from '@/shared/store/hooks';
import { selectImageDataUrlMap } from '@/shared/store/slices/imagesSlice';
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
  const imageMap = useAppSelector(selectImageDataUrlMap);
  const {
    name, setName,
    content, setContent,
    isEditing, canSave,
    handleCreate, handleUpdate, handleDelete,
  } = useBlockForm(blockId, () => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le bloc' : 'Nouveau bloc'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 min-h-[60vh]">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="block-name" className="text-sm font-medium text-foreground">
                Nom
              </label>
              <Input
                id="block-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du bloc"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="block-content" className="text-sm font-medium text-foreground">
                Contenu
              </label>
              <Textarea
                id="block-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Contenu markdown du bloc..."
                className="font-mono flex-1 min-h-[300px] resize-y"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <span className="text-sm font-medium text-foreground">Aperçu</span>
            <div className="flex-1 rounded-lg border border-border overflow-auto p-4 bg-background">
              <MarkdownPreview
                content={content}
                imageMap={imageMap}
                emptyMessage="Aperçu du bloc..."
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <DeleteBlockDialog blockName={name} onConfirm={handleDelete} />
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
