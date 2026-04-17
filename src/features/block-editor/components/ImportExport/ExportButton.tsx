import { downloadFile } from '@/features/block-editor/services/fileFormat.service'
import { Button } from '@/shared/components/ui/button'

type Props = {
  disabled?: boolean
  getContent: () => string
  getFilename: () => string
  label: string
}

function ExportButton({
  disabled,
  getContent,
  getFilename,
  label,
}: Props) {
  const handleClick = () => {
    downloadFile(getFilename(), getContent())
  }

  return (
    <Button disabled={disabled} onClick={handleClick} size="xs" variant="outline">
      {label}
    </Button>
  )
}

export default ExportButton
