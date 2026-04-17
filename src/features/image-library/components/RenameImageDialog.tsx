import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { StoredImage } from '../types/image.types';

type RenameImageDialogProps = {
  image: StoredImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRename: (imageId: string, nextName: string) => void | Promise<void>;
};

type RenameImageFormProps = {
  image: StoredImage;
  onOpenChange: (open: boolean) => void;
  onRename: (imageId: string, nextName: string) => void | Promise<void>;
};

function RenameImageForm({
  image,
  onOpenChange,
  onRename,
}: RenameImageFormProps) {
  const [name, setName] = useState(image.name);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Renommer l’image</DialogTitle>
        <DialogDescription>
          Donne un nom plus clair pour la retrouver dans la bibliothèque.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nom de l’image"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={() => void onRename(image.id, name)}>
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
}

export function RenameImageDialog({
  image,
  open,
  onOpenChange,
  onRename,
}: RenameImageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {image ? (
          <RenameImageForm
            key={image.id}
            image={image}
            onOpenChange={onOpenChange}
            onRename={onRename}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
