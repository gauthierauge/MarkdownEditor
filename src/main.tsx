import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './shared/store';
import { EditorInsertProvider } from './shared/context/editor-insert/EditorInsertProvider';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EditorInsertProvider>
          <App />
        </EditorInsertProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
