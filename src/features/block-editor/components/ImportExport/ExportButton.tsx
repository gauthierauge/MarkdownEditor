import { downloadFile } from '@/features/block-editor/services/fileFormat.service';
import { Button } from '@/shared/components/ui/button';
import { Upload } from 'lucide-react';

type Props = {
  label: string;
  getFilename: () => string;
  getContent: () => string;
  disabled?: boolean;
};

export default function ExportButton({ label, getFilename, getContent, disabled }: Props) {
  const handleClick = () => {
    downloadFile(getFilename(), getContent());
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      variant="outline"
      size="xs"
    >
      <Upload className="w-3.5 h-3.5" /> {label}
    </Button>
  );
}
