import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { ImagePlus, Pencil, Download, Trash2 } from 'lucide-react';
import type { StoredImage } from '../types/image.types';

type ImagePreviewDialogProps = {
  image: StoredImage | null;
  open: boolean;
  canInsert: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (image: StoredImage) => void;
  onRename: (image: StoredImage) => void;
  onExport: (image: StoredImage) => void;
  onDelete: (image: StoredImage) => void;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function ImagePreviewDialog({
  image,
  open,
  canInsert,
  onOpenChange,
  onInsert,
  onRename,
  onExport,
  onDelete,
}: ImagePreviewDialogProps) {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="truncate">{image.name}</DialogTitle>
          <DialogDescription>
            {image.mimeType} &middot; {formatFileSize(image.byteSize)}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-lg border border-border bg-black/5 dark:bg-white/5">
          <img
            src={image.dataUrl}
            alt={image.name}
            className="mx-auto block max-h-[60vh] object-contain"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Button size="icon-sm" variant="outline" onClick={() => onRename(image)} title="Renommer">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => onExport(image)} title="Exporter">
              <Download className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => { onDelete(image); onOpenChange(false); }}
              title="Supprimer"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button onClick={() => onInsert(image)} disabled={!canInsert}>
            <ImagePlus className="h-4 w-4" />
            Insérer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
