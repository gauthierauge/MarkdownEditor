import { Button } from '@/shared/components'
import { downloadTextFile, serializeImages, serializeSingleImage } from '@/utils/imageFormat'
import type { StoredImage } from '@/features/image-library/types'

type ExportImagesButtonProps = {
  fileName: string
  images: StoredImage[]
  label: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
}

function ExportImagesButton({
  fileName,
  images,
  label,
  variant = 'secondary',
}: ExportImagesButtonProps) {
  function handleExport() {
    if (!images.length) {
      return
    }

    const content =
      images.length === 1 ? serializeSingleImage(images[0]) : serializeImages(images)

    downloadTextFile(content, fileName)
  }

  return (
    <Button disabled={!images.length} onClick={handleExport} variant={variant}>
      {label}
    </Button>
  )
}

export default ExportImagesButton
