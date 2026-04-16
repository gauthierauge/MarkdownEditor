import { openDB, type DBSchema } from 'idb'
import type { StoredImage } from '@/features/image-library/types'

const DB_NAME = 'markdown-editor'
const STORE_NAME = 'images'

interface MarkdownEditorDb extends DBSchema {
  images: {
    key: string
    value: StoredImage
    indexes: {
      updatedAt: string
    }
  }
}

const dbPromise = openDB<MarkdownEditorDb>(DB_NAME, 1, {
  upgrade(db) {
    if (db.objectStoreNames.contains(STORE_NAME)) {
      return
    }

    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
    store.createIndex('updatedAt', 'updatedAt')
  },
})

export async function getAllImagesFromDb() {
  const db = await dbPromise
  const images = await db.getAll(STORE_NAME)

  return images.sort((imageA, imageB) =>
    imageB.updatedAt.localeCompare(imageA.updatedAt),
  )
}

export async function saveImageToDb(image: StoredImage) {
  const db = await dbPromise

  await db.put(STORE_NAME, image)
}

export async function saveImagesToDb(images: StoredImage[]) {
  const db = await dbPromise
  const transaction = db.transaction(STORE_NAME, 'readwrite')

  await Promise.all(images.map((image) => transaction.store.put(image)))
  await transaction.done
}

export async function deleteImageFromDb(imageId: string) {
  const db = await dbPromise

  await db.delete(STORE_NAME, imageId)
}
