import { downloadFile } from '@/shared/lib/downloadFile';
import type { StoredImage } from '../types/image.types';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('Lecture du fichier impossible.'));
    reader.readAsDataURL(file);
  });
}

function normalizeImageName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, '') || 'image';
}

function normalizeImportedImage(value: unknown): StoredImage {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Format image invalide.');
  }

  const image = value as Partial<StoredImage>;

  if (
    typeof image.id !== 'string' ||
    typeof image.name !== 'string' ||
    typeof image.mimeType !== 'string' ||
    typeof image.dataUrl !== 'string'
  ) {
    throw new Error('Image importée incomplète.');
  }

  const now = new Date().toISOString();

  return {
    id: image.id,
    name: image.name,
    mimeType: image.mimeType,
    dataUrl: image.dataUrl,
    byteSize: typeof image.byteSize === 'number' ? image.byteSize : 0,
    createdAt: typeof image.createdAt === 'string' ? image.createdAt : now,
    updatedAt: typeof image.updatedAt === 'string' ? image.updatedAt : now,
  };
}

export async function createStoredImageFromFile(file: File): Promise<StoredImage> {
  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: normalizeImageName(file.name),
    mimeType: file.type || 'image/*',
    dataUrl: await readFileAsDataUrl(file),
    byteSize: file.size,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function buildImageMarkdown(image: StoredImage): string {
  return `![${image.name}](${image.dataUrl})`;
}

export function parseImportedImages(raw: string): StoredImage[] {
  const parsed = JSON.parse(raw) as unknown;

  if (Array.isArray(parsed)) {
    return parsed.map(normalizeImportedImage);
  }

  if (typeof parsed === 'object' && parsed !== null && 'images' in parsed) {
    const images = (parsed as { images?: unknown }).images;
    if (!Array.isArray(images)) {
      throw new Error('Le fichier .imgs.mdlc est invalide.');
    }

    return images.map(normalizeImportedImage);
  }

  return [normalizeImportedImage(parsed)];
}

export function exportSingleImage(image: StoredImage): void {
  downloadFile(
    `${image.name}.img.mdlc`,
    JSON.stringify(image, null, 2),
    'application/json',
  );
}

export function exportImageLibrary(images: StoredImage[]): void {
  downloadFile('images.imgs.mdlc', JSON.stringify(images, null, 2), 'application/json');
}
