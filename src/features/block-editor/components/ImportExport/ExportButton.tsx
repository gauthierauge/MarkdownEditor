import { downloadFile } from '@/features/block-editor/services/fileFormat.ts';
import { Button } from '@/shared/components/ui/button';

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
      {label}
    </Button>
  );
}
