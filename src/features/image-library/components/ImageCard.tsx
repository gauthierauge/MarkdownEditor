import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card';
import type { StoredImage } from '../types/image.types';

type ImageCardProps = {
  image: StoredImage;
  canInsert: boolean;
  onPreview: (image: StoredImage) => void;
  onRename: (image: StoredImage) => void;
  onDelete: (image: StoredImage) => void;
  onInsert: (image: StoredImage) => void;
  onExport: (image: StoredImage) => void;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} o`;
  }

  return `${Math.round(bytes / 1024)} Ko`;
}

export function ImageCard({
  image,
  canInsert,
  onPreview,
  onRename,
  onDelete,
  onInsert,
  onExport,
}: ImageCardProps) {
  return (
    <Card className="image-card">
      <CardContent className="image-card__content">
        <button
          type="button"
          className="image-card__media-button"
          onClick={() => onPreview(image)}
        >
          <img src={image.dataUrl} alt={image.name} className="image-card__media" />
        </button>

        <div className="space-y-1">
          <h3 className="image-card__title">{image.name}</h3>
          <p className="text-sm text-muted-foreground">
            {image.mimeType} · {formatFileSize(image.byteSize)}
          </p>
          <p className="text-sm text-muted-foreground">
            Clique la miniature pour ouvrir l’image en grand.
          </p>
        </div>
      </CardContent>

      <CardFooter className="image-card__actions">
        <Button onClick={() => onInsert(image)} disabled={!canInsert}>
          Insérer
        </Button>
        <Button variant="outline" onClick={() => onPreview(image)}>
          Aperçu
        </Button>
        <Button variant="outline" onClick={() => onRename(image)}>
          Renommer
        </Button>
        <Button variant="outline" onClick={() => onExport(image)}>
          Exporter
        </Button>
        <Button variant="destructive" onClick={() => onDelete(image)}>
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
}
