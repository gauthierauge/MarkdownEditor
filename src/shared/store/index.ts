import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import blocksReducer from './slices/blocksSlice';
import uiReducer from './slices/uiSlice';
import foldersReducer from './slices/foldersSlice';
import markdownReducer from './slices/markdownSlice';
import imagesReducer from './slices/imagesSlice';

const customStorage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('localStorage quota exceeded:', e);
    }
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    return Promise.resolve(localStorage.removeItem(key))
  },
};

const persistConfig = {
  key: 'root',
  storage: customStorage,
  whitelist: ['blocks', 'folders', 'markdown'],
};

const rootReducer = combineReducers({
  blocks: blocksReducer,
  ui: uiReducer,
  folders: foldersReducer,
  markdown: markdownReducer,
  images: imagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
