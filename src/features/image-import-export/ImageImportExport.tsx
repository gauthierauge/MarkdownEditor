import ExportImagesButton from './components/ExportImagesButton'
import ImportImagesButton from './components/ImportImagesButton'
import useImageImportExport from './hooks/useImageImportExport'
import type { ImageImportExportProps } from './types'
import './styles/ImageImportExport.css'

function ImageImportExport({
  images,
  onError,
  onImport,
}: ImageImportExportProps) {
  const imageImportExport = useImageImportExport({
    images,
    onError,
    onImport,
  })

  return (
    <div className="button-group image-import-export">
      <ImportImagesButton
        onError={imageImportExport.onError}
        onImport={imageImportExport.onImport}
      />
      <ExportImagesButton
        fileName="bibliotheque.imgs.mdlc"
        images={imageImportExport.images}
        label="Exporter la bibliotheque"
      />
    </div>
  )
}

export default ImageImportExport
