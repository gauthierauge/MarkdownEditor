import type { StoredImage } from '@/features/image-library/types/ImageLibrary.types'

function sanitizeAltText(name: string) {
  return name.replace(/\[/g, '').replace(/\]/g, '').trim() || 'image'
}

export function buildImageMarkdown(image: StoredImage) {
  return `![${sanitizeAltText(image.name)}](${image.dataUrl})`
}
