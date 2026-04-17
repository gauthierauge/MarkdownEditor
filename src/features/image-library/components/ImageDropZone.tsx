import { useDropzone } from 'react-dropzone';
import { Button } from '@/shared/components/ui/button';

type ImageDropZoneProps = {
  onFilesSelected: (files: File[]) => void | Promise<void>;
};

const ACCEPTED_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
};

export function ImageDropZone({ onFilesSelected }: ImageDropZoneProps) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: ACCEPTED_TYPES,
    noClick: true,
    onDropAccepted: (files) => {
      void onFilesSelected(files);
    },
  });

  return (
    <div
      {...getRootProps({
        className: `image-dropzone ${isDragActive ? 'is-drag-active' : ''}`,
      })}
    >
      <input {...getInputProps()} />

      <div className="space-y-2">
        <p className="text-base font-semibold text-foreground">Dépose tes images ici</p>
        <p className="text-sm text-muted-foreground">
          PNG, JPG, WebP, SVG. Le drag and drop passe par <code>react-dropzone</code>.
        </p>
      </div>

      <Button onClick={open} type="button">
        Parcourir
      </Button>
    </div>
  );
}
