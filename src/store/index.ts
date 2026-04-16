import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import blocksReducer from './blocksSlice.ts';
import editorReducer from './editorSlice.ts';
import uiReducer from './uiSlice.ts';
import foldersReducer from './foldersSlice.ts';

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
}

const persistConfig = {
  key: 'root',
  storage: customStorage,
  whitelist: ['blocks', 'folders'],
};

const rootReducer = combineReducers({
  blocks: blocksReducer,
  editor: editorReducer,
  ui: uiReducer,
  folders: foldersReducer,
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
