import { useDropzone } from 'react-dropzone';
import { Button } from '@/shared/components/ui/button';
import { Upload } from 'lucide-react';

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
        className: `flex flex-col items-center justify-center gap-1.5 min-h-[4.5rem] rounded-lg border border-dashed p-3 transition-all ${
          isDragActive
            ? 'border-primary bg-primary/[0.07] shadow-[0_0_0_3px] shadow-primary/10'
            : 'border-border bg-muted/30'
        }`,
      })}
    >
      <input {...getInputProps()} />
      <span className="text-xs text-muted-foreground">
        {isDragActive ? 'Dépose ici…' : 'Glisser ou'}
      </span>
      <Button onClick={open} type="button" size="xs" variant="outline">
        <Upload className="h-3 w-3" /> Parcourir
      </Button>
    </div>
  );
}
