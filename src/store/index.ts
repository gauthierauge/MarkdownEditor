import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage

import blocksReducer from './blocksSlice.ts'
import editorReducer from './editorSlice.ts'

const persistConfig = {
  key: 'root',
  storage,
}

// Combine les deux slices puis applique redux-persist sur l'ensemble
const rootReducer = combineReducers({
  blocks: blocksReducer,
  editor: editorReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-persist dispatche des actions non-sérialisables (FLUSH, REHYDRATE, etc.)
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
