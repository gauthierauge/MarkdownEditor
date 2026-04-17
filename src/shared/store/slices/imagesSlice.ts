import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { StoredImage } from '@/features/image-library/types/image.types';

type ImagesStatus = 'idle' | 'loading' | 'ready' | 'error';

interface ImagesState {
  items: StoredImage[];
  status: ImagesStatus;
  errorMessage: string | null;
}

const initialState: ImagesState = {
  items: [],
  status: 'idle',
  errorMessage: null,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<StoredImage[]>) {
      state.items = action.payload;
    },
    upsertImages(state, action: PayloadAction<StoredImage[]>) {
      const nextById = new Map(state.items.map((image) => [image.id, image]));

      action.payload.forEach((image) => {
        nextById.set(image.id, image);
      });

      state.items = Array.from(nextById.values()).sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt),
      );
    },
    renameImage(
      state,
      action: PayloadAction<{ id: string; name: string; updatedAt: string }>,
    ) {
      state.items = state.items.map((image) =>
        image.id === action.payload.id
          ? { ...image, name: action.payload.name, updatedAt: action.payload.updatedAt }
          : image,
      );
    },
    removeImage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((image) => image.id !== action.payload);
    },
    setImagesStatus(state, action: PayloadAction<ImagesStatus>) {
      state.status = action.payload;
    },
    setImagesError(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setImages,
  upsertImages,
  renameImage,
  removeImage,
  setImagesStatus,
  setImagesError,
} = imagesSlice.actions;

export default imagesSlice.reducer;

export const selectImages = (state: RootState) => state.images.items;
export const selectImagesStatus = (state: RootState) => state.images.status;
export const selectImagesError = (state: RootState) => state.images.errorMessage;

export const selectImageDataUrlMap = createSelector(
  selectImages,
  (images): Record<string, string> =>
    Object.fromEntries(images.map((img) => [img.id, img.dataUrl])),
);
