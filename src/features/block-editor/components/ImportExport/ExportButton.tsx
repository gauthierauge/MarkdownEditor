import { downloadFile } from '@/features/block-editor/utils/fileFormat.ts';

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
    <button
      onClick={handleClick}
      disabled={disabled}
      className="px-3 py-1.5 text-xs rounded bg-[#1a1a2e] text-gray-300 border border-[#2e303a] hover:border-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    >
      {label}
    </button>
  );
}
