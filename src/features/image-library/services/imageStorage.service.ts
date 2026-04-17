import type { StoredImage } from '../types/image.types';

const DB_NAME = 'markdown-editor';
const DB_VERSION = 1;
const STORE_NAME = 'images';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Impossible d’ouvrir IndexedDB.'));
  });
}

function awaitRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Requête IndexedDB échouée.'));
  });
}

export async function getAllImagesFromDb(): Promise<StoredImage[]> {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const images = await awaitRequest(store.getAll() as IDBRequest<StoredImage[]>);

    return images.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } finally {
    database.close();
  }
}

export async function saveImageToDb(image: StoredImage): Promise<void> {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await awaitRequest(store.put(image));
  } finally {
    database.close();
  }
}

export async function saveImagesToDb(images: StoredImage[]): Promise<void> {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await Promise.all(images.map((image) => awaitRequest(store.put(image))));
  } finally {
    database.close();
  }
}

export async function deleteImageFromDb(id: string): Promise<void> {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await awaitRequest(store.delete(id));
  } finally {
    database.close();
  }
}
