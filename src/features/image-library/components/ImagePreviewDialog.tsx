import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import type { StoredImage } from '../types/image.types';

type ImagePreviewDialogProps = {
  image: StoredImage | null;
  open: boolean;
  canInsert: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (image: StoredImage) => void;
};

export function ImagePreviewDialog({
  image,
  open,
  canInsert,
  onOpenChange,
  onInsert,
}: ImagePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        {image ? (
          <>
            <DialogHeader>
              <DialogTitle>{image.name}</DialogTitle>
              <DialogDescription>
                Prévisualisation de l’image avant insertion dans le Markdown.
              </DialogDescription>
            </DialogHeader>

            <div className="image-preview-dialog">
              <img src={image.dataUrl} alt={image.name} className="image-preview-dialog__media" />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fermer
              </Button>
              <Button onClick={() => onInsert(image)} disabled={!canInsert}>
                Insérer
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
