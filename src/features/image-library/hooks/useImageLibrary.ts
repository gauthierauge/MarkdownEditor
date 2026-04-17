import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  removeImage,
  renameImage,
  selectImages,
  selectImagesError,
  selectImagesStatus,
  setImages,
  setImagesError,
  setImagesStatus,
  upsertImages,
} from '@/shared/store/slices/imagesSlice';
import {
  insertIntoOpenFile,
  selectOpenFileId,
  selectOpenFileName,
} from '@/shared/store/slices/markdownSlice';
import type { StoredImage } from '../types/image.types';
import {
  buildImageMarkdown,
  createStoredImageFromFile,
  exportImageLibrary,
  exportSingleImage,
  parseImportedImages,
} from '../services/imageFormat.service';
import {
  deleteImageFromDb,
  getAllImagesFromDb,
  saveImageToDb,
  saveImagesToDb,
} from '../services/imageStorage.service';

type Feedback = {
  tone: 'success' | 'error';
  message: string;
} | null;

async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('Lecture du fichier impossible.'));
    reader.readAsText(file);
  });
}

export function useImageLibrary() {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);
  const imagesStatus = useAppSelector(selectImagesStatus);
  const imagesError = useAppSelector(selectImagesError);
  const openFileId = useAppSelector(selectOpenFileId);
  const openFileName = useAppSelector(selectOpenFileName);

  const [query, setQuery] = useState('');
  const [previewedImage, setPreviewedImage] = useState<StoredImage | null>(null);
  const [renamedImage, setRenamedImage] = useState<StoredImage | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imagesStatus !== 'idle') {
      return;
    }

    let isMounted = true;
    dispatch(setImagesStatus('loading'));

    getAllImagesFromDb()
      .then((storedImages) => {
        if (!isMounted) {
          return;
        }

        dispatch(setImages(storedImages));
        dispatch(setImagesStatus('ready'));
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : 'Impossible de charger la bibliothèque.';
        dispatch(setImagesError(message));
        dispatch(setImagesStatus('error'));
      });

    return () => {
      isMounted = false;
    };
  }, [dispatch, imagesStatus]);

  const filteredImages = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return images;
    }

    return images.filter((image) => image.name.toLowerCase().includes(needle));
  }, [images, query]);

  const clearFeedback = () => setFeedback(null);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    clearFeedback();
    dispatch(setImagesError(null));

    try {
      const nextImages = await Promise.all(files.map(createStoredImageFromFile));
      await saveImagesToDb(nextImages);
      dispatch(upsertImages(nextImages));
      dispatch(setImagesStatus('ready'));
      setFeedback({
        tone: 'success',
        message: `${nextImages.length} image(s) ajoutée(s) à la bibliothèque.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'L’ajout des images a échoué.';
      dispatch(setImagesError(message));
      setFeedback({ tone: 'error', message });
    }
  };

  const handleDelete = async (image: StoredImage) => {
    clearFeedback();

    try {
      await deleteImageFromDb(image.id);
      dispatch(removeImage(image.id));
      setFeedback({
        tone: 'success',
        message: `L’image "${image.name}" a été supprimée.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'La suppression a échoué.';
      dispatch(setImagesError(message));
      setFeedback({ tone: 'error', message });
    }
  };

  const handleRename = async (imageId: string, nextName: string) => {
    const trimmedName = nextName.trim();

    if (!trimmedName) {
      return;
    }

    const targetImage = images.find((image) => image.id === imageId);
    if (!targetImage) {
      return;
    }

    const updatedImage: StoredImage = {
      ...targetImage,
      name: trimmedName,
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveImageToDb(updatedImage);
      dispatch(
        renameImage({
          id: updatedImage.id,
          name: updatedImage.name,
          updatedAt: updatedImage.updatedAt,
        }),
      );
      setRenamedImage(null);
      setFeedback({
        tone: 'success',
        message: `L’image a été renommée en "${updatedImage.name}".`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Le renommage a échoué.';
      dispatch(setImagesError(message));
      setFeedback({ tone: 'error', message });
    }
  };

  const handleInsert = (image: StoredImage) => {
    if (!openFileId) {
      setFeedback({
        tone: 'error',
        message: 'Ouvre un fichier Markdown avant d’insérer une image.',
      });
      return;
    }

    dispatch(insertIntoOpenFile(buildImageMarkdown(image)));
    setFeedback({
      tone: 'success',
      message: `Image insérée dans "${openFileName ?? openFileId}".`,
    });
  };

  const handleExportLibrary = () => {
    exportImageLibrary(images);
  };

  const handleExportSingle = (image: StoredImage) => {
    exportSingleImage(image);
  };

  const openImportDialog = () => {
    importInputRef.current?.click();
  };

  const handleImportChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const raw = await readFileAsText(file);
      const importedImages = parseImportedImages(raw);
      await saveImagesToDb(importedImages);
      dispatch(upsertImages(importedImages));
      dispatch(setImagesStatus('ready'));
      setFeedback({
        tone: 'success',
        message: `${importedImages.length} image(s) importée(s).`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'L’import des images a échoué.';
      dispatch(setImagesError(message));
      setFeedback({ tone: 'error', message });
    }
  };

  return {
    images,
    filteredImages,
    imagesStatus,
    imagesError,
    openFileId,
    openFileName,
    query,
    setQuery,
    feedback,
    previewedImage,
    renamedImage,
    importInputRef,
    canInsert: Boolean(openFileId),
    setPreviewedImage,
    setRenamedImage,
    clearFeedback,
    handleFilesSelected,
    handleDelete,
    handleRename,
    handleInsert,
    handleExportLibrary,
    handleExportSingle,
    openImportDialog,
    handleImportChange,
  };
}
