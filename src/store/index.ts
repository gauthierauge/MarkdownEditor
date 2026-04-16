import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import blocksReducer from './blocksSlice'
import editorReducer from './editorSlice'
import imagesReducer from './imagesSlice'

type PersistStorage = {
  getItem: (key: string) => Promise<string | null>
  removeItem: (key: string) => Promise<void>
  setItem: (key: string, value: string) => Promise<void>
}

const storage: PersistStorage = {
  async getItem(key) {
    return window.localStorage.getItem(key)
  },
  async removeItem(key) {
    window.localStorage.removeItem(key)
  },
  async setItem(key, value) {
    window.localStorage.setItem(key, value)
  },
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['images'],
}

const rootReducer = combineReducers({
  blocks: blocksReducer,
  editor: editorReducer,
  images: imagesReducer,
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
