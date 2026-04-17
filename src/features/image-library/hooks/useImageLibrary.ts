import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
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
} from '@/shared/store/imagesSlice'
import {
  insertIntoOpenFile,
  selectOpenFileId,
} from '@/shared/store/slices/markdownSlice'
import { readFileAsDataUrl } from '@/utils/fileReaders'
import { createStoredImageFromFile } from '@/utils/imageFormat'
import {
  deleteImageFromDb,
  getAllImagesFromDb,
  saveImageToDb,
  saveImagesToDb,
} from '@/utils/imagesDb'
import { buildImageMarkdown } from '@/utils/markdown'
import type { StoredImage } from '../types/ImageLibrary.types'

function useImageLibrary() {
  const dispatch = useAppDispatch()
  const currentFileId = useAppSelector(selectOpenFileId)
  const images = useAppSelector(selectImages)
  const status = useAppSelector(selectImagesStatus)
  const errorMessage = useAppSelector(selectImagesError)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [previewedImage, setPreviewedImage] = useState<StoredImage | null>(null)
  const [renamedImage, setRenamedImage] = useState<StoredImage | null>(null)

  useEffect(() => {
    if (status !== 'idle') {
      return
    }

    let isMounted = true

    async function hydrateImages() {
      dispatch(setImagesStatus('loading'))

      try {
        const storedImages = await getAllImagesFromDb()

        if (!isMounted) {
          return
        }

        dispatch(setImages(storedImages))
      } catch (error) {
        if (!isMounted) {
          return
        }

        dispatch(
          setImagesError(
            error instanceof Error
              ? error.message
              : "Impossible de charger la bibliotheque d'images.",
          ),
        )
      }
    }

    void hydrateImages()

    return () => {
      isMounted = false
    }
  }, [dispatch, status])

  async function mergeImages(nextImages: StoredImage[]) {
    await saveImagesToDb(nextImages)
    dispatch(upsertImages(nextImages))
  }

  async function handleImageFiles(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))

    if (!imageFiles.length) {
      setStatusMessage('Aucun fichier image valide n a ete detecte.')
      return
    }

    setBusy(true)

    try {
      const storedImages = await Promise.all(
        imageFiles.map(async (file) => {
          const dataUrl = await readFileAsDataUrl(file)
          return createStoredImageFromFile(file, dataUrl)
        }),
      )

      await mergeImages(storedImages)
      setStatusMessage(`${storedImages.length} image(s) ajoutee(s) a la bibliotheque.`)
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "L'import des images a echoue.",
      )
    } finally {
      setBusy(false)
    }
  }

  function handleInsert(image: StoredImage) {
    if (!currentFileId) {
      setStatusMessage("Ouvre d'abord un fichier avant d'inserer une image.")
      return
    }

    dispatch(insertIntoOpenFile(buildImageMarkdown(image)))
    setStatusMessage(`Image inseree dans le fichier ${currentFileId}.`)
  }

  async function handleDelete(image: StoredImage) {
    if (!confirm(`Supprimer l'image "${image.name}" ?`)) {
      return
    }

    await deleteImageFromDb(image.id)
    dispatch(removeImage(image.id))

    if (previewedImage?.id === image.id) {
      setPreviewedImage(null)
    }

    if (renamedImage?.id === image.id) {
      setRenamedImage(null)
    }

    setStatusMessage(`Image "${image.name}" supprimee.`)
  }

  async function handleRename(name: string) {
    if (!renamedImage) {
      return
    }

    const updatedImage: StoredImage = {
      ...renamedImage,
      name,
      updatedAt: new Date().toISOString(),
    }

    await saveImageToDb(updatedImage)
    dispatch(
      renameImage({
        imageId: updatedImage.id,
        name: updatedImage.name,
        updatedAt: updatedImage.updatedAt,
      }),
    )
    setRenamedImage(null)
    setStatusMessage(`Image renommee en "${name}".`)
  }

  async function handleImportedImages(importedImages: StoredImage[]) {
    setBusy(true)

    try {
      await mergeImages(importedImages)
      setStatusMessage(`${importedImages.length} image(s) importee(s).`)
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'Impossible d importer ces images.',
      )
    } finally {
      setBusy(false)
    }
  }

  return {
    busy,
    errorMessage,
    filteredImages: images,
    handleDelete,
    handleImageFiles,
    handleImportedImages,
    handleInsert,
    handleRename,
    images,
    previewedImage,
    renamedImage,
    setPreviewedImage,
    setRenamedImage,
    setStatusMessage,
    status,
    statusMessage,
  }
}

export default useImageLibrary
