import type { StoredImage } from '@/features/image-library/types/ImageLibrary.types'

export type ImageImportExportProps = {
  images: StoredImage[]
  onError: (message: string) => void
  onImport: (images: StoredImage[]) => Promise<void> | void
}
