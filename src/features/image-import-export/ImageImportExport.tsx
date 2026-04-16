import type { StoredImage } from '@/features/image-library/types'
import ExportImagesButton from './components/ExportImagesButton'
import ImportImagesButton from './components/ImportImagesButton'

type ImageImportExportProps = {
  images: StoredImage[]
  onError: (message: string) => void
  onImport: (images: StoredImage[]) => Promise<void> | void
}

function ImageImportExport({
  images,
  onError,
  onImport,
}: ImageImportExportProps) {
  return (
    <div className="button-group">
      <ImportImagesButton onError={onError} onImport={onImport} />
      <ExportImagesButton
        fileName="bibliotheque.imgs.mdlc"
        images={images}
        label="Exporter la bibliothèque"
      />
    </div>
  )
}

export default ImageImportExport
