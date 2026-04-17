import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import blocksReducer from './blocksSlice';
import uiReducer from './uiSlice';
import foldersReducer from './foldersSlice';
import markdownReducer from './markdownSlice';

const customStorage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(localStorage.setItem(key, value))
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
