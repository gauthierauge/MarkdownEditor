import type { ImageImportExportProps } from '../types/ImageImportExport.types'

function useImageImportExport({
  images,
  onError,
  onImport,
}: ImageImportExportProps) {
  return {
    images,
    onError,
    onImport,
  }
}

export default useImageImportExport
