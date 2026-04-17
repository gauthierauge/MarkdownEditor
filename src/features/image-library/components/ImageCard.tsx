import { Button } from '@/shared/components/ui/button';
import { Eye, ImagePlus } from 'lucide-react';
import type { StoredImage } from '../types/image.types';

type ImageCardProps = {
  image: StoredImage;
  canInsert: boolean;
  onPreview: (image: StoredImage) => void;
  onInsert: (image: StoredImage) => void;
};

export function ImageCard({
  image,
  canInsert,
  onPreview,
  onInsert,
}: ImageCardProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="group/thumb relative overflow-hidden rounded-md">
        <button
          type="button"
          className="block w-full cursor-pointer rounded-md border border-border bg-muted p-0"
          onClick={() => onPreview(image)}
        >
          <img
            src={image.dataUrl}
            alt={image.name}
            className="block w-full aspect-square object-cover"
          />
        </button>

        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-150 cursor-pointer group-hover/thumb:bg-black/30 group-hover/thumb:opacity-100 disabled:cursor-default"
          onClick={() => onInsert(image)}
          disabled={!canInsert}
          title="Insérer dans le markdown"
        >
          <ImagePlus className="h-5 w-5 text-white drop-shadow-md" />
        </button>
      </div>

      <span
        className="block truncate text-center text-[10px] leading-tight text-foreground"
        title={image.name}
      >
        {image.name}
      </span>

      <div className="flex justify-center">
        <Button size="icon-xs" variant="ghost" onClick={() => onPreview(image)} title="Aperçu">
          <Eye className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
