import type { StoredImage } from '@/features/image-library/types'

type SingleImageExportFile = {
  image: StoredImage
  kind: 'markdown-editor-image'
  version: 1
}

type ImageListExportFile = {
  images: StoredImage[]
  kind: 'markdown-editor-images'
  version: 1
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function estimateByteSize(dataUrl: string) {
  const [, payload = ''] = dataUrl.split(',')
  return Math.round((payload.length * 3) / 4)
}

export function normalizeImportedImage(candidate: Partial<StoredImage>) {
  const now = new Date().toISOString()
  const name = candidate.name?.trim() || 'image-importee'
  const dataUrl = candidate.dataUrl ?? ''

  if (!dataUrl.startsWith('data:')) {
    throw new Error('Le fichier importé ne contient pas d’image base64 valide.')
  }

  return {
    id: candidate.id ?? crypto.randomUUID(),
    name,
    mimeType: candidate.mimeType ?? 'image/png',
    dataUrl,
    byteSize: candidate.byteSize ?? estimateByteSize(dataUrl),
    createdAt: candidate.createdAt ?? now,
    updatedAt: now,
  }
}

export function createStoredImageFromFile(file: File, dataUrl: string): StoredImage {
  const now = new Date().toISOString()
  const name = file.name.replace(/\.[^.]+$/, '').trim() || 'image'

  return {
    id: crypto.randomUUID(),
    name,
    mimeType: file.type || 'image/*',
    dataUrl,
    byteSize: file.size,
    createdAt: now,
    updatedAt: now,
  }
}

export function serializeSingleImage(image: StoredImage) {
  const payload: SingleImageExportFile = {
    kind: 'markdown-editor-image',
    version: 1,
    image,
  }

  return JSON.stringify(payload, null, 2)
}

export function serializeImages(images: StoredImage[]) {
  const payload: ImageListExportFile = {
    kind: 'markdown-editor-images',
    version: 1,
    images,
  }

  return JSON.stringify(payload, null, 2)
}

export function parseImportedImages(content: string) {
  const parsed = JSON.parse(content) as unknown

  if (isRecord(parsed) && parsed.kind === 'markdown-editor-image' && 'image' in parsed) {
    return [normalizeImportedImage(parsed.image as Partial<StoredImage>)]
  }

  if (isRecord(parsed) && parsed.kind === 'markdown-editor-images' && 'images' in parsed) {
    const images = parsed.images

    if (!Array.isArray(images)) {
      throw new Error('Le fichier .imgs.mdlc est invalide.')
    }

    return images.map((image) => normalizeImportedImage(image as Partial<StoredImage>))
  }

  throw new Error('Format d’import inconnu. Utilise .img.mdlc ou .imgs.mdlc.')
}

export function downloadTextFile(
  content: string,
  fileName: string,
  mimeType = 'application/json',
) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
