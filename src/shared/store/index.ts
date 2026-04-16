import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import blocksReducer from './blocksSlice'
import editorReducer, {
  insertAtCursor,
  openFile,
  setContent,
  setCursorPosition,
  setSelection,
} from './editorSlice'
import foldersReducer from './foldersSlice'
import imagesReducer, {
  setImages,
  setImagesError,
  setImagesStatus,
} from './imagesSlice'
import uiReducer from './uiSlice'

const storage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['blocks', 'editor', 'folders'],
}

const rootReducer = combineReducers({
  blocks: blocksReducer,
  editor: editorReducer,
  folders: foldersReducer,
  images: imagesReducer,
  ui: uiReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/FLUSH',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
  insertAtCursor,
  openFile,
  setContent,
  setCursorPosition,
  setImages,
  setImagesError,
  setImagesStatus,
  setSelection,
}
