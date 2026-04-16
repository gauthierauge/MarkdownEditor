import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { insertAtCursor, selectCurrentFileId } from '@/store/editorSlice'
import {
  removeImage,
  renameImage,
  selectImages,
  selectImagesError,
  selectImagesStatus,
  upsertImages,
} from '@/store/imagesSlice'
import { readFileAsDataUrl } from '@/utils/fileReaders'
import { createStoredImageFromFile } from '@/utils/imageFormat'
import { deleteImageFromDb, saveImageToDb, saveImagesToDb } from '@/utils/imagesDb'
import { buildImageMarkdown } from '@/utils/markdown'
import type { StoredImage } from '../types'

function useImageLibrary() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentFileId = useAppSelector(selectCurrentFileId)
  const images = useAppSelector(selectImages)
  const status = useAppSelector(selectImagesStatus)
  const errorMessage = useAppSelector(selectImagesError)
  const [searchValue, setSearchValue] = useState('')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [previewedImage, setPreviewedImage] = useState<StoredImage | null>(null)
  const [renamedImage, setRenamedImage] = useState<StoredImage | null>(null)

  const normalizedSearch = searchValue.trim().toLowerCase()
  const filteredImages = normalizedSearch
    ? images.filter((image) => image.name.toLowerCase().includes(normalizedSearch))
    : images

  async function mergeImages(nextImages: StoredImage[]) {
    await saveImagesToDb(nextImages)
    dispatch(upsertImages(nextImages))
  }

  async function handleImageFiles(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))

    if (!imageFiles.length) {
      setStatusMessage('Aucun fichier image valide n’a été détecté.')
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
      setStatusMessage(`${storedImages.length} image(s) ajoutée(s) à la bibliothèque.`)
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'L’import des images a échoué.',
      )
    } finally {
      setBusy(false)
    }
  }

  function handleInsert(image: StoredImage) {
    dispatch(insertAtCursor(buildImageMarkdown(image)))
    setStatusMessage(`Image insérée dans le fichier ${currentFileId}.`)
  }

  async function handleDelete(image: StoredImage) {
    if (!confirm(`Supprimer l’image "${image.name}" ?`)) {
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

    setStatusMessage(`Image "${image.name}" supprimée.`)
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
    setStatusMessage(`Image renommée en "${name}".`)
  }

  async function handleImportedImages(importedImages: StoredImage[]) {
    setBusy(true)

    try {
      await mergeImages(importedImages)
      setStatusMessage(`${importedImages.length} image(s) importée(s).`)
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'Impossible d’importer ces images.',
      )
    } finally {
      setBusy(false)
    }
  }

  function navigateToCurrentFile() {
    navigate(`/files/${currentFileId}`)
  }

  return {
    busy,
    currentFileId,
    errorMessage,
    filteredImages,
    handleDelete,
    handleImageFiles,
    handleImportedImages,
    handleInsert,
    handleRename,
    images,
    navigateToCurrentFile,
    previewedImage,
    renamedImage,
    searchValue,
    setPreviewedImage,
    setRenamedImage,
    setSearchValue,
    setStatusMessage,
    status,
    statusMessage,
  }
}

export default useImageLibrary
