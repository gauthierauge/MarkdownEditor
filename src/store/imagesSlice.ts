import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { StoredImage } from '@/features/image-library/types'
import type { RootState } from './index'

type ImagesStatus = 'idle' | 'loading' | 'ready' | 'error'

interface ImagesState {
  items: StoredImage[]
  status: ImagesStatus
  errorMessage: string | null
}

const initialState: ImagesState = {
  items: [],
  status: 'idle',
  errorMessage: null,
}

function sortImages(images: StoredImage[]) {
  return [...images].sort((imageA, imageB) =>
    imageB.updatedAt.localeCompare(imageA.updatedAt),
  )
}

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<StoredImage[]>) {
      state.items = sortImages(action.payload)
      state.status = 'ready'
      state.errorMessage = null
    },
    upsertImages(state, action: PayloadAction<StoredImage[]>) {
      const registry = new Map(state.items.map((image) => [image.id, image]))

      action.payload.forEach((image) => {
        registry.set(image.id, image)
      })

      state.items = sortImages(Array.from(registry.values()))
      state.status = 'ready'
      state.errorMessage = null
    },
    renameImage(
      state,
      action: PayloadAction<{ imageId: string; name: string; updatedAt: string }>,
    ) {
      state.items = sortImages(
        state.items.map((image) =>
          image.id === action.payload.imageId
            ? {
                ...image,
                name: action.payload.name,
                updatedAt: action.payload.updatedAt,
              }
            : image,
        ),
      )
    },
    removeImage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((image) => image.id !== action.payload)
    },
    setImagesStatus(state, action: PayloadAction<ImagesStatus>) {
      state.status = action.payload

      if (action.payload !== 'error') {
        state.errorMessage = null
      }
    },
    setImagesError(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.errorMessage = action.payload
    },
  },
})

export const {
  removeImage,
  renameImage,
  setImages,
  setImagesError,
  setImagesStatus,
  upsertImages,
} = imagesSlice.actions

export const selectImages = (state: RootState) => state.images.items
export const selectImagesStatus = (state: RootState) => state.images.status
export const selectImagesError = (state: RootState) => state.images.errorMessage

export default imagesSlice.reducer
