import { downloadFile } from '@/features/block-editor/utils/fileFormat.ts'

type Props = {
  label: string
  getFilename: () => string
  getContent: () => string
  disabled?: boolean
}

export default function ExportButton({
  label,
  getFilename,
  getContent,
  disabled,
}: Props) {
  const handleClick = () => {
    downloadFile(getFilename(), getContent())
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-xs text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  )
}
